import React, { useState, useMemo, useEffect, useRef } from 'react'
import { useFormStore } from '../../store/formStore'
import { page2ASchema } from '../../lib/validation'
import { saveFormDataIncremental } from '../../lib/formTracking'
import { Button } from '../Button'
import { trackPage2Submit, trackFormComplete } from '../../lib/metaEvents'

interface QualifiedLeadFormProps {
  onComplete: () => void
}

const counselorData = {
  bch: {
    name: 'Viswanathan Ramakrishnan',
    title: 'Managing Partner',
    image: '/vishy.png',
    linkedin: 'https://www.linkedin.com/in/viswanathan-r-8504182/',
    bio: 'IIT-IIM alum with 20+ yrs in education - built Manipal schools, founded Magic Crate (acquired by BYJU\'S). Dedicated to helping your child thrive in tomorrow\'s world.',
  },
  'lum-l1': {
    name: 'Karthik Lakshman',
    title: 'Managing Partner',
    image: '/karthik.png',
    linkedin: 'https://www.linkedin.com/in/karthiklakshman/',
    bio: 'Georgia Tech Masters graduate. Former McKinsey consultant and Byju\'s Test Prep division leader with international education expertise.',
  },
  'lum-l2': {
    name: 'Karthik Lakshman',
    title: 'Managing Partner',
    image: '/karthik.png',
    linkedin: 'https://www.linkedin.com/in/karthiklakshman/',
    bio: 'Georgia Tech Masters graduate. Former McKinsey consultant and Byju\'s Test Prep division leader with international education expertise.',
  },
}

const timeSlots = [
  '10 AM', '11 AM', '12 PM', '1 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'
]

export const QualifiedLeadForm: React.FC<QualifiedLeadFormProps> = ({ onComplete }) => {
  const formState = useFormStore()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFullBio, setShowFullBio] = useState(false)
  const parentDetailsTracked = useRef(false)

  const counselor = counselorData[formState.leadCategory as 'bch' | 'lum-l1' | 'lum-l2']

  const availableDates = useMemo(() => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    return dates
  }, [])

  const formatDate = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  const isSlotAvailable = (slot: string, date: Date) => {
    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()

    if (isToday) {
      const currentHour = today.getHours()
      const slotHour = parseInt(slot.split(' ')[0])
      const isPM = slot.includes('PM')
      const actualHour = isPM && slotHour !== 12 ? slotHour + 12 : slotHour

      if (actualHour < currentHour + 2) {
        return false
      }
    }

    if (formState.leadCategory === 'lum-l1' || formState.leadCategory === 'lum-l2') {
      const day = date.getDay()
      if (day === 0) return false

      const slotHour = parseInt(slot.split(' ')[0])
      const isPM = slot.includes('PM')
      const actualHour = isPM && slotHour !== 12 ? slotHour + 12 : slotHour

      if ((actualHour >= 11 && actualHour <= 14) || (actualHour >= 16 && actualHour <= 20)) {
        return true
      }
      return false
    }

    return true
  }

  const availableSlots = useMemo(() => {
    if (!formState.selectedDate) return []
    const selectedDate = availableDates.find(d => formatDate(d) === formState.selectedDate)
    if (!selectedDate) return []
    return timeSlots.filter(slot => isSlotAvailable(slot, selectedDate))
  }, [formState.selectedDate, availableDates])

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

    if (field === 'selectedDate' && formState.selectedSlot) {
      const selectedDate = availableDates.find(d => formatDate(d) === value)
      if (selectedDate && !isSlotAvailable(formState.selectedSlot, selectedDate)) {
        formState.updateField('selectedSlot', '')
      }
    }

    if ((field === 'selectedDate' || field === 'selectedSlot') && value) {
      const hasDate = field === 'selectedDate' ? value : formState.selectedDate
      const hasSlot = field === 'selectedSlot' ? value : formState.selectedSlot

      if (hasDate && hasSlot) {
        formState.updateField('isCounsellingBooked', true)
        saveFormDataIncremental(
          formState.sessionId,
          {
            selectedDate: hasDate,
            selectedSlot: hasSlot,
            isCounsellingBooked: true,
          },
          '08_page_2_counselling_slot_selected'
        )
      }
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
        selectedDate: formState.selectedDate,
        selectedSlot: formState.selectedSlot,
      }

      const result = page2ASchema.safeParse(formData)

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

      console.log('QualifiedLeadForm final save - isQualifiedLead:', formState.isQualifiedLead)
      console.log('QualifiedLeadForm final save - leadCategory:', formState.leadCategory)
      console.log('QualifiedLeadForm final save - isCounsellingBooked:', formState.isCounsellingBooked)
      console.log('QualifiedLeadForm final save - pageCompleted:', formState.pageCompleted)

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
          selectedDate: formState.selectedDate,
          selectedSlot: formState.selectedSlot,
          funnelStage: '10_form_submit',
          isQualifiedLead: formState.isQualifiedLead,
          leadCategory: formState.leadCategory,
          isCounsellingBooked: formState.isCounsellingBooked,
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
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto space-y-6 md:space-y-8">
      <div className="bg-gradient-to-br from-gold/10 via-gold/5 to-transparent rounded-xl border-2 border-gold/30 p-6 md:p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">
          Great news about {formState.studentName}! 🎉
        </h2>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
          <span className="font-semibold text-navy">{formState.studentName}</span> has strong potential for elite university admissions! Book a strategy session with our Managing Partner.
        </p>
      </div>

      <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg p-6 md:p-8 space-y-4">
        <div className="text-center md:text-left mb-4">
          <span className="inline-block px-3 py-1 bg-gold/20 text-gold font-semibold text-xs uppercase tracking-wide rounded-full">
            Founder-Led Session
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden ring-4 ring-gold/20">
            <img
              src={counselor.image}
              alt={counselor.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-navy mb-1">{counselor.name}</h3>
            <p className="text-sm md:text-base text-gold font-semibold mb-3">{counselor.title}</p>

            <div className="md:hidden">
              <p className="text-sm text-gray-700 leading-relaxed">
                {showFullBio ? counselor.bio : `${counselor.bio.substring(0, 80)}...`}
              </p>
              <button
                type="button"
                onClick={() => setShowFullBio(!showFullBio)}
                className="text-sm text-gold hover:text-gold/80 font-medium mt-2 transition-colors"
              >
                {showFullBio ? 'View Less ↑' : 'View More ↓'}
              </button>
            </div>

            <div className="hidden md:block">
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                {counselor.bio}
              </p>
            </div>

            <a
              href={counselor.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-gold hover:text-gold/80 font-medium transition-colors mt-2"
            >
              View LinkedIn Profile →
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Date *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availableDates.map((date) => {
              const formattedDate = formatDate(date)
              return (
                <button
                  key={formattedDate}
                  type="button"
                  onClick={() => handleFieldChange('selectedDate', formattedDate)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all text-left ${
                    formState.selectedDate === formattedDate
                      ? 'border-gold bg-gold/10 text-navy font-medium'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="text-sm font-medium">{formattedDate.split(',')[0]}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {formattedDate.split(',').slice(1).join(',')}
                  </div>
                </button>
              )
            })}
          </div>
          {errors.selectedDate && (
            <p className="mt-1 text-sm text-red-600">{errors.selectedDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Time Slot *
          </label>
          {!formState.selectedDate ? (
            <p className="text-sm text-gray-500 italic">Please select a date first</p>
          ) : availableSlots.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No slots available for this date</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => handleFieldChange('selectedSlot', slot)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    formState.selectedSlot === slot
                      ? 'border-gold bg-gold/10 text-navy font-medium'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
          {errors.selectedSlot && (
            <p className="mt-1 text-sm text-red-600">{errors.selectedSlot}</p>
          )}
        </div>

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

      <div className="flex flex-col items-center pt-4 space-y-3">
        <Button
          type="submit"
          variant="primary"
          onClick={() => {}}
          className="px-12 w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Book Strategy Session'}
        </Button>
        <p className="text-xs text-gray-500 text-center max-w-md">
          This is a complimentary strategy session. You'll receive confirmation within 24 hours.
        </p>
      </div>
    </form>
  )
}
