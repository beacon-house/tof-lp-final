import React, { useState, useEffect, useRef } from 'react'
import { useFormStore } from '../../store/formStore'
import { page2BSchema } from '../../lib/validation'
import { saveFormDataIncremental } from '../../lib/formTracking'
import { Button } from '../Button'
import { trackPage2Submit, trackFormComplete } from '../../lib/metaEvents'

interface DisqualifiedLeadFormProps {
  onComplete: () => void
}

export const DisqualifiedLeadForm: React.FC<DisqualifiedLeadFormProps> = ({ onComplete }) => {
  const formState = useFormStore()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const parentDetailsTracked = useRef(false)

  const getMessage = () => {
    if (formState.leadCategory === 'masters') {
      return {
        title: 'Masters Program Application',
        description: 'We specialize in helping students secure admissions to top Masters programs worldwide.',
      }
    }
    return {
      title: 'Let\'s Discuss Your Journey',
      description: 'We\'d love to understand your goals and help create a personalized roadmap for your university applications.',
    }
  }

  const message = getMessage()

  useEffect(() => {
    const isParentDetailsComplete =
      formState.parentName.trim().length >= 2 &&
      formState.email.trim().length > 0 &&
      formState.email.includes('@')

    if (isParentDetailsComplete && !parentDetailsTracked.current) {
      parentDetailsTracked.current = true
      saveFormDataIncremental(
        formState.sessionId,
        {
          parentName: formState.parentName,
          email: formState.email,
        },
        '09_page_2_parent_details_filled'
      )
    }
  }, [formState.parentName, formState.email, formState.sessionId])

  const handleFieldChange = (field: string, value: any) => {
    formState.updateField(field as any, value)
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      const formData = {
        parentName: formState.parentName,
        email: formState.email,
      }

      const result = page2BSchema.safeParse(formData)

      if (!result.success) {
        const newErrors: Record<string, string> = {}
        result.error.issues.forEach((err: any) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(newErrors)
        setIsSubmitting(false)
        return
      }

      formState.updateField('funnelStage', '10_form_submit')

      console.log('DisqualifiedLeadForm final save - isQualifiedLead:', formState.isQualifiedLead)
      console.log('DisqualifiedLeadForm final save - leadCategory:', formState.leadCategory)
      console.log('DisqualifiedLeadForm final save - pageCompleted:', formState.pageCompleted)

      console.log('🎯 Tracking Page 2 Submit Events...')
      const page2SubmitEvents = trackPage2Submit(
        formState.leadCategory || undefined,
        formState.isQualifiedLead,
        formState.formFillerType as 'parent' | 'student'
      )

      console.log('🎯 Tracking Form Complete Events...')
      const formCompleteEvents = trackFormComplete(
        formState.leadCategory || undefined,
        formState.isQualifiedLead,
        formState.formFillerType as 'parent' | 'student'
      )

      const allMetaEvents = [...page2SubmitEvents, ...formCompleteEvents]
      formState.addTriggeredEvents(allMetaEvents)

      await saveFormDataIncremental(
        formState.sessionId,
        {
          parentName: formState.parentName,
          email: formState.email,
          funnelStage: '10_form_submit',
          isQualifiedLead: formState.isQualifiedLead,
          leadCategory: formState.leadCategory,
          pageCompleted: formState.pageCompleted,
          triggeredEvents: formState.triggeredEvents,
        },
        '10_form_submit'
      )

      onComplete()
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({ submit: 'An error occurred. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-8 min-h-[600px] mt-20 lg:mt-0">
      <div className="text-center space-y-3">
        <h3 className="text-lg font-semibold text-navy">{message.title}</h3>
        <p className="text-gray-600">{message.description}</p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-2">
            Parent's Name *
          </label>
          <input
            type="text"
            id="parentName"
            value={formState.parentName}
            onChange={(e) => handleFieldChange('parentName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            placeholder="Enter parent's full name"
          />
          {errors.parentName && (
            <p className="mt-1 text-sm text-red-600">{errors.parentName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Parent's Email *
          </label>
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            placeholder="parent@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      {errors.submit && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          variant="primary"
          onClick={() => {}}
          className="px-12"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  )
}
