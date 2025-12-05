import React, { useState, useEffect, useRef } from 'react'
import { useFormStore } from '../../store/formStore'
import { page1Schema } from '../../lib/validation'
import { categorizeLeadByProgram } from '../../lib/leadCategorization'
import { saveFormDataIncremental } from '../../lib/formTracking'
import { Button } from '../Button'
import {
  trackPrimaryClassificationEvents,
  trackPage1CompleteWithCategory,
  MetaEventData
} from '../../lib/metaEvents'

interface InitialLeadCaptureFormProps {
  onComplete: () => void
}

export const InitialLeadCaptureForm: React.FC<InitialLeadCaptureFormProps> = ({ onComplete }) => {
  const formState = useFormStore()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionsTracked = useRef({ section1: false, section2: false, section3: false })

  const handleFieldChange = async (field: string, value: any) => {
    formState.updateField(field as any, value)
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  useEffect(() => {
    const isSection1Complete =
      formState.formFillerType !== '' &&
      formState.studentName.trim().length >= 2 &&
      formState.currentGrade !== '' &&
      formState.location.trim().length >= 2 &&
      formState.phoneNumber.length === 10

    if (isSection1Complete && !sectionsTracked.current.section1) {
      sectionsTracked.current.section1 = true
      saveFormDataIncremental(
        formState.sessionId,
        {
          formFillerType: formState.formFillerType,
          studentName: formState.studentName,
          currentGrade: formState.currentGrade,
          location: formState.location,
          countryCode: formState.countryCode,
          phoneNumber: formState.phoneNumber,
        },
        '02_page1_student_info_filled'
      )
    }
  }, [formState.formFillerType, formState.studentName, formState.currentGrade, formState.location, formState.phoneNumber, formState.sessionId, formState.countryCode])

  useEffect(() => {
    const isSection2Complete =
      formState.curriculumType !== '' &&
      formState.schoolName.trim().length >= 2 &&
      ((formState.gradeFormat === 'gpa' && formState.gpaValue !== '') ||
       (formState.gradeFormat === 'percentage' && formState.percentageValue !== ''))

    if (isSection2Complete && !sectionsTracked.current.section2) {
      sectionsTracked.current.section2 = true
      saveFormDataIncremental(
        formState.sessionId,
        {
          curriculumType: formState.curriculumType,
          schoolName: formState.schoolName,
          gradeFormat: formState.gradeFormat,
          gpaValue: formState.gpaValue,
          percentageValue: formState.percentageValue,
        },
        '03_page1_academic_info_filled'
      )
    }
  }, [formState.curriculumType, formState.schoolName, formState.gradeFormat, formState.gpaValue, formState.percentageValue, formState.sessionId])

  useEffect(() => {
    const isSection3Complete =
      formState.scholarshipRequirement !== '' &&
      formState.targetGeographies.length > 0

    if (isSection3Complete && !sectionsTracked.current.section3) {
      sectionsTracked.current.section3 = true
      saveFormDataIncremental(
        formState.sessionId,
        {
          scholarshipRequirement: formState.scholarshipRequirement,
          targetGeographies: formState.targetGeographies,
        },
        '04_page1_scholarship_info_filled'
      )
    }
  }, [formState.scholarshipRequirement, formState.targetGeographies, formState.sessionId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      const formData = {
        formFillerType: formState.formFillerType,
        studentName: formState.studentName,
        currentGrade: formState.currentGrade,
        location: formState.location,
        countryCode: formState.countryCode,
        phoneNumber: formState.phoneNumber,
        curriculumType: formState.curriculumType,
        schoolName: formState.schoolName,
        gradeFormat: formState.gradeFormat,
        gpaValue: formState.gpaValue,
        percentageValue: formState.percentageValue,
        scholarshipRequirement: formState.scholarshipRequirement,
        targetGeographies: formState.targetGeographies,
      }

      console.log('Form submission started')
      console.log('Form data:', formData)

      const result = page1Schema.safeParse(formData)
      console.log('Validation result:', result.success ? 'SUCCESS' : 'FAILED')

      if (!result.success) {
        console.log('Validation errors:', result.error.issues)
        const newErrors: Record<string, string> = {}
        result.error.issues.forEach((err: any) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(newErrors)
        setIsSubmitting(false)

        const firstErrorField = Object.keys(newErrors)[0]
        const errorElement = document.getElementById(firstErrorField)
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          errorElement.focus()
        }
        return
      }

      const leadCategory = categorizeLeadByProgram({
        formFillerType: formState.formFillerType as 'parent' | 'student',
        currentGrade: formState.currentGrade,
        scholarshipRequirement: formState.scholarshipRequirement as any,
        targetGeographies: formState.targetGeographies,
        gpaValue: formState.gpaValue,
        percentageValue: formState.percentageValue,
        gradeFormat: formState.gradeFormat,
      })

      console.log('Lead category:', leadCategory)

      const isQualified = ['bch', 'lum-l1', 'lum-l2'].includes(leadCategory)
      console.log('Is qualified lead:', isQualified)

      const metaEventData: MetaEventData = {
        formFillerType: formState.formFillerType as 'parent' | 'student',
        currentGrade: formState.currentGrade,
        scholarshipRequirement: formState.scholarshipRequirement,
        targetGeographies: formState.targetGeographies,
        gpaValue: formState.gpaValue,
        percentageValue: formState.percentageValue,
        gradeFormat: formState.gradeFormat,
        leadCategory,
        isQualified,
      }

      console.log('🎯 Tracking Primary Classification Events...')
      const primaryEvents = trackPrimaryClassificationEvents(metaEventData)

      console.log('🎯 Tracking Page 1 Complete with Category Events...')
      const page1Events = trackPage1CompleteWithCategory(metaEventData, leadCategory)

      const allMetaEvents = [...primaryEvents, ...page1Events]
      formState.addTriggeredEvents(allMetaEvents)

      formState.updateMultipleFields({
        leadCategory,
        isQualifiedLead: isQualified,
        pageCompleted: 1,
        funnelStage: '05_page1_complete',
      })

      console.log('Saving form data to database...')
      const saveResult = await saveFormDataIncremental(
        formState.sessionId,
        {
          ...formData,
          leadCategory,
          isQualifiedLead: isQualified,
          pageCompleted: 1,
          utmParams: formState.utmParams,
          triggeredEvents: formState.triggeredEvents,
        },
        '05_page1_complete'
      )
      console.log('Database save result:', saveResult)

      console.log('Calling onComplete callback...')
      onComplete()
      console.log('Form submission complete!')
    } catch (error) {
      console.error('Form submission error:', error)
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
      setErrors({ submit: 'An error occurred. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto space-y-8 min-h-[600px]">
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-navy">Student Information</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Who is filling this form? *
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleFieldChange('formFillerType', 'parent')}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                formState.formFillerType === 'parent'
                  ? 'border-gold bg-gold/10 text-navy font-medium'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              Parent
            </button>
            <button
              type="button"
              onClick={() => handleFieldChange('formFillerType', 'student')}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                formState.formFillerType === 'student'
                  ? 'border-gold bg-gold/10 text-navy font-medium'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              Student
            </button>
          </div>
          {errors.formFillerType && (
            <p className="mt-1 text-sm text-red-600">{errors.formFillerType}</p>
          )}
        </div>

        <div>
          <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
            Student's Name *
          </label>
          <input
            type="text"
            id="studentName"
            value={formState.studentName}
            onChange={(e) => handleFieldChange('studentName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            placeholder="Enter student's full name"
          />
          {errors.studentName && (
            <p className="mt-1 text-sm text-red-600">{errors.studentName}</p>
          )}
        </div>

        <div>
          <label htmlFor="currentGrade" className="block text-sm font-medium text-gray-700 mb-2">
            Grade in Academic Year 25-26 *
          </label>
          <select
            id="currentGrade"
            value={formState.currentGrade}
            onChange={(e) => handleFieldChange('currentGrade', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
          >
            <option value="">Select Grade</option>
            <option value="12">Grade 12</option>
            <option value="11">Grade 11</option>
            <option value="10">Grade 10</option>
            <option value="9">Grade 9</option>
            <option value="8">Grade 8</option>
            <option value="7_below">Grade 7 or Below</option>
            <option value="masters">Masters</option>
          </select>
          {errors.currentGrade && (
            <p className="mt-1 text-sm text-red-600">{errors.currentGrade}</p>
          )}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Current City/Town/Place of Residence *
          </label>
          <input
            type="text"
            id="location"
            value={formState.location}
            onChange={(e) => handleFieldChange('location', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            placeholder="Enter city or town"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Parent Phone Number *
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={formState.countryCode}
              onChange={(e) => handleFieldChange('countryCode', e.target.value)}
              className="w-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              placeholder="+91"
            />
            <input
              type="tel"
              value={formState.phoneNumber}
              onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              placeholder="10-digit phone number"
            />
          </div>
          {(errors.countryCode || errors.phoneNumber) && (
            <p className="mt-1 text-sm text-red-600">
              {errors.countryCode || errors.phoneNumber}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-navy">Academic Information</h3>

        <div>
          <label htmlFor="curriculumType" className="block text-sm font-medium text-gray-700 mb-2">
            Curriculum Type *
          </label>
          <select
            id="curriculumType"
            value={formState.curriculumType}
            onChange={(e) => handleFieldChange('curriculumType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
          >
            <option value="">Select Curriculum</option>
            <option value="IB">IB</option>
            <option value="IGCSE">IGCSE</option>
            <option value="CBSE">CBSE</option>
            <option value="ICSE">ICSE</option>
            <option value="State_Boards">State Boards</option>
            <option value="Others">Others</option>
          </select>
          {errors.curriculumType && (
            <p className="mt-1 text-sm text-red-600">{errors.curriculumType}</p>
          )}
        </div>

        <div>
          <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-2">
            School Name *
          </label>
          <input
            type="text"
            id="schoolName"
            value={formState.schoolName}
            onChange={(e) => handleFieldChange('schoolName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            placeholder="Enter school name"
          />
          {errors.schoolName && (
            <p className="mt-1 text-sm text-red-600">{errors.schoolName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Grade Format *
          </label>
          <div className="flex gap-4 mb-3">
            <button
              type="button"
              onClick={() => handleFieldChange('gradeFormat', 'gpa')}
              className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                formState.gradeFormat === 'gpa'
                  ? 'border-gold bg-gold/10 text-navy font-medium'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              GPA
            </button>
            <button
              type="button"
              onClick={() => handleFieldChange('gradeFormat', 'percentage')}
              className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                formState.gradeFormat === 'percentage'
                  ? 'border-gold bg-gold/10 text-navy font-medium'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              Percentage
            </button>
          </div>

          {formState.gradeFormat === 'gpa' ? (
            <input
              type="text"
              value={formState.gpaValue}
              onChange={(e) => {
                const value = e.target.value
                if (/^\d*\.?\d*$/.test(value)) {
                  handleFieldChange('gpaValue', value)
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              placeholder="Enter GPA (1.0 to 10.0)"
            />
          ) : (
            <input
              type="text"
              value={formState.percentageValue}
              onChange={(e) => {
                const value = e.target.value
                if (/^\d*\.?\d*$/.test(value)) {
                  handleFieldChange('percentageValue', value)
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              placeholder="Enter Percentage (1 to 100)"
            />
          )}
          {(errors.gpaValue || errors.percentageValue) && (
            <p className="mt-1 text-sm text-red-600">
              {errors.gpaValue || errors.percentageValue}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-navy">Study Preferences</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Level of Scholarship Needed *
          </label>
          <div className="space-y-3">
            {[
              { value: 'full_scholarship', label: 'Full scholarship needed' },
              { value: 'partial_scholarship', label: 'Partial scholarship needed' },
              { value: 'scholarship_optional', label: 'Scholarship optional' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleFieldChange('scholarshipRequirement', option.value)}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all text-left ${
                  formState.scholarshipRequirement === option.value
                    ? 'border-gold bg-gold/10 text-navy font-medium'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {errors.scholarshipRequirement && (
            <p className="mt-1 text-sm text-red-600">{errors.scholarshipRequirement}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Geographies * (Select all that apply)
          </label>
          <div className="space-y-2">
            {['US', 'UK', 'Rest of World', 'Need Guidance'].map((geo) => (
              <label key={geo} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formState.targetGeographies.includes(geo)}
                  onChange={(e) => {
                    const newGeographies = e.target.checked
                      ? [...formState.targetGeographies, geo]
                      : formState.targetGeographies.filter((g) => g !== geo)
                    handleFieldChange('targetGeographies', newGeographies)
                  }}
                  className="w-5 h-5 text-gold border-gray-300 rounded focus:ring-gold"
                />
                <span className="text-gray-700">{geo}</span>
              </label>
            ))}
          </div>
          {errors.targetGeographies && (
            <p className="mt-1 text-sm text-red-600">{errors.targetGeographies}</p>
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
          {isSubmitting ? 'Processing...' : 'Continue'}
        </Button>
      </div>
    </form>
  )
}
