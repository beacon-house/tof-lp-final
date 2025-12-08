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

  const [isCounselorExpanded, setIsCounselorExpanded] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-6xl mx-auto min-h-[600px]">
      <div className="bg-gradient-to-br from-navy/5 via-white to-navy/5 rounded-xl border border-navy/20 p-3 md:p-4 mb-4 mt-20 lg:mt-0">
        <h2 className="text-lg md:text-xl font-bold text-navy text-center leading-tight">
          Congratulations! {formState.studentName} has strong potential for Ivy League universities and global top-tier programs
        </h2>
        <p className="text-xs md:text-sm text-gray-600 text-center mt-2">
          Book a founder-led strategy session to explore personalized pathways
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <div className="lg:w-[35%] lg:flex-shrink-0">
          <div className={`bg-white rounded-xl border border-gray-200 transition-all ${isCounselorExpanded || !isMobile ? 'p-4' : 'p-2'}`}>
            {isCounselorExpanded || !isMobile ? (
              <>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden ring-2 ring-navy/20">
                    <img
                      src={counselor.image}
                      alt={counselor.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-base font-medium text-navy leading-tight">{counselor.name}</h3>
                      <span className="px-2 py-0.5 bg-navy text-white font-semibold text-[9px] uppercase tracking-wide rounded whitespace-nowrap flex-shrink-0">
                        Founder
                      </span>
                    </div>
                    <p className="text-[11px] lg:text-xs text-gray-600 mb-2">{counselor.title}</p>
                    <p className="text-[11px] lg:text-xs text-gray-700 leading-snug">{counselor.bio}</p>
                  </div>
                </div>
                <a
                  href={counselor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] lg:text-xs text-navy hover:text-navy/70 font-medium transition-colors"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn Profile
                </a>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsCounselorExpanded(true)}
                className="flex items-center gap-2 w-full"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden ring-1 ring-navy/20">
                  <img
                    src={counselor.image}
                    alt={counselor.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs font-bold text-navy">{counselor.name}</p>
                  <p className="text-[10px] text-gray-600">View profile</p>
                </div>
              </button>
            )}
          </div>
        </div>

        <div className="lg:w-[65%] lg:flex-shrink-0 space-y-4">
          {formState.selectedDate && !isCounselorExpanded ? (
            <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center justify-between lg:hidden">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-medium text-navy">{formState.selectedDate.split(',')[0]}, {formState.selectedDate.split(',')[1].trim().split(' ').slice(1, 3).join(' ')}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  handleFieldChange('selectedDate', '')
                  handleFieldChange('selectedSlot', '')
                  setIsCounselorExpanded(true)
                }}
                className="text-[11px] text-navy hover:text-navy/70 font-medium"
              >
                Change
              </button>
            </div>
          ) : null}

          {(!isMobile || !formState.selectedDate || isCounselorExpanded) && (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <label className="text-sm font-semibold text-navy">Select Date</label>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {availableDates.map((date) => {
                  const formattedDate = formatDate(date)
                  const dayName = formattedDate.split(',')[0]
                  const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                  const monthName = fullMonths[date.getMonth()]
                  const dayNum = date.getDate()

                  return (
                    <button
                      key={formattedDate}
                      type="button"
                      onClick={() => {
                        handleFieldChange('selectedDate', formattedDate)
                        if (isMobile) {
                          setIsCounselorExpanded(false)
                        }
                      }}
                      className={`px-2 py-2 rounded-lg border transition-all text-center ${
                        formState.selectedDate === formattedDate
                          ? 'border-navy bg-navy/10 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`text-[11px] font-semibold leading-tight mb-0.5 ${formState.selectedDate === formattedDate ? 'text-navy' : 'text-navy'}`}>
                        {dayName}
                      </div>
                      <div className={`text-[11px] leading-tight ${formState.selectedDate === formattedDate ? 'text-navy' : 'text-gray-600'}`}>
                        {dayNum} {monthName}
                      </div>
                    </button>
                  )
                })}
              </div>
              {errors.selectedDate && (
                <p className="mt-2 text-xs text-red-600">{errors.selectedDate}</p>
              )}
            </div>
          )}

          {formState.selectedDate && (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <label className="text-sm font-semibold text-navy">Select Time</label>
              </div>
              {availableSlots.length === 0 ? (
                <p className="text-xs text-gray-500 italic">No slots available for this date</p>
              ) : (
                <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleFieldChange('selectedSlot', slot)}
                      className={`px-2 py-2 rounded-lg border transition-all text-xs font-medium ${
                        formState.selectedSlot === slot
                          ? 'border-navy bg-navy/10 text-navy shadow-sm'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
              {errors.selectedSlot && (
                <p className="mt-2 text-xs text-red-600">{errors.selectedSlot}</p>
              )}
            </div>
          )}

          {formState.selectedDate && formState.selectedSlot && (
            <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <label htmlFor="parentName" className="text-sm font-medium text-navy">Parent's Name</label>
                </div>
                <input
                  type="text"
                  id="parentName"
                  value={formState.parentName}
                  onChange={(e) => handleFieldChange('parentName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/30 focus:border-navy text-sm"
                  placeholder="Full name"
                />
                {errors.parentName && (
                  <p className="mt-1 text-xs text-red-600">{errors.parentName}</p>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <label htmlFor="email" className="text-sm font-medium text-navy">Email Address</label>
                </div>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/30 focus:border-navy text-sm"
                  placeholder="parent@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>
            </div>
          )}

          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs text-red-600">{errors.submit}</p>
            </div>
          )}

          {formState.selectedDate && formState.selectedSlot && (
            <div className="pt-1">
              <Button
                type="submit"
                variant="primary"
                onClick={() => {}}
                className="w-full text-sm md:text-base py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </form>
  )
}
