import { LeadCategory } from './leadCategorization'
import { FormState } from '../store/formStore'
import { shouldLog } from './logger'

declare global {
  interface Window {
    fbq?: (command: string, eventName: string, customData?: Record<string, any>, userData?: Record<string, any>) => void
  }
}

export interface MetaUserData {
  em?: string
  ph?: string
  fn?: string
  ln?: string
  ct?: string
  external_id?: string
}

interface LeadClassificationData {
  formFillerType?: 'parent' | 'student'
  currentGrade?: string
  scholarshipRequirement?: string
  targetGeographies?: string[]
  gpaValue?: string
  percentageValue?: string
  gradeFormat?: 'gpa' | 'percentage'
  leadCategory?: LeadCategory
}

function getEnvironmentSuffix(): string {
  const env = import.meta.env.VITE_ENVIRONMENT || 'stg'
  return env === 'prod' ? 'prod' : 'stg'
}

function formatPhoneE164(countryCode: string, phoneNumber: string): string {
  const cleanCountry = countryCode.replace(/\D/g, '')
  const cleanPhone = phoneNumber.replace(/\D/g, '')
  return cleanCountry + cleanPhone
}

function formatName(name: string): { fn: string; ln?: string } {
  const trimmed = name.trim().toLowerCase()
  const spaceIndex = trimmed.indexOf(' ')

  if (spaceIndex === -1) {
    return { fn: trimmed }
  }

  return {
    fn: trimmed.substring(0, spaceIndex),
    ln: trimmed.substring(spaceIndex + 1)
  }
}

export function buildMetaUserData(formState: Partial<FormState>): MetaUserData {
  const userData: MetaUserData = {}

  if (formState.sessionId) {
    userData.external_id = formState.sessionId
  }

  if (formState.countryCode && formState.phoneNumber) {
    userData.ph = formatPhoneE164(formState.countryCode, formState.phoneNumber)
  }

  if (formState.location) {
    userData.ct = formState.location.toLowerCase().trim().replace(/\s+/g, '')
  }

  if (formState.email) {
    userData.em = formState.email.toLowerCase().trim()
  }

  if (formState.parentName) {
    const { fn, ln } = formatName(formState.parentName)
    userData.fn = fn
    if (ln) {
      userData.ln = ln
    }
  }

  return userData
}

export function isSpamLead(data: LeadClassificationData): boolean {
  if (data.gradeFormat === 'gpa' && data.gpaValue === '10') {
    return true
  }
  if (data.gradeFormat === 'percentage' && data.percentageValue === '100') {
    return true
  }
  return false
}

export function simulateStudentAsParent(data: LeadClassificationData): LeadCategory {
  if (!data.currentGrade || !data.scholarshipRequirement || !data.targetGeographies) {
    return 'nurture'
  }

  if (data.scholarshipRequirement === 'full_scholarship') {
    return 'nurture'
  }

  if (['7_below', 'masters'].includes(data.currentGrade)) {
    return 'nurture'
  }

  if (
    ['8', '9', '10'].includes(data.currentGrade) &&
    ['scholarship_optional', 'partial_scholarship'].includes(data.scholarshipRequirement)
  ) {
    return 'bch'
  }

  if (
    data.currentGrade === '11' &&
    ['scholarship_optional', 'partial_scholarship'].includes(data.scholarshipRequirement) &&
    data.targetGeographies.includes('US')
  ) {
    return 'bch'
  }

  if (
    data.currentGrade === '11' &&
    data.scholarshipRequirement === 'scholarship_optional' &&
    data.targetGeographies.some(geo => ['UK', 'Rest of World', 'Need Guidance'].includes(geo))
  ) {
    return 'lum-l1'
  }

  if (
    data.currentGrade === '12' &&
    data.scholarshipRequirement === 'scholarship_optional'
  ) {
    return 'lum-l1'
  }

  if (
    data.currentGrade === '11' &&
    data.scholarshipRequirement === 'partial_scholarship' &&
    data.targetGeographies.some(geo => ['UK', 'Rest of World', 'Need Guidance'].includes(geo))
  ) {
    return 'lum-l2'
  }

  if (
    data.currentGrade === '12' &&
    data.scholarshipRequirement === 'partial_scholarship'
  ) {
    return 'lum-l2'
  }

  return 'nurture'
}

export function trackMetaEvent(eventName: string, userData?: MetaUserData): string {
  const env = getEnvironmentSuffix()
  const fullEventName = `${eventName}_${env}`

  if (shouldLog()) {
    console.log('🎯 META EVENT FIRED:', {
      eventName: fullEventName,
      timestamp: new Date().toISOString(),
      userData: userData || {}
    })
    console.log('📊 Event Parameters:', JSON.stringify(userData || {}, null, 2))
  }

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', fullEventName, {}, userData || {})
  }

  return fullEventName
}

export function initializeMetaPixel(): void {
  const pixelId = import.meta.env.VITE_META_PIXEL_ID

  if (typeof window !== 'undefined' && window.fbq && pixelId) {
    window.fbq('init', pixelId)
    window.fbq('track', 'PageView')
    if (shouldLog()) {
      console.log('✅ Meta Pixel Initialized:', pixelId)
    }
  }
}

export function trackPageView(): string[] {
  return [trackMetaEvent('tof_v1_page_view')]
}

export function trackHeroCTA(): string[] {
  return [trackMetaEvent('tof_v1_cta_hero')]
}

export function trackUnderstandApproachCTA(): string[] {
  return [trackMetaEvent('tof_v1_cta_understand_our_approach')]
}

export function trackPage1Continue(): string[] {
  return [trackMetaEvent('mof_v1_page_1_continue')]
}

export function trackPage2View(formState: Partial<FormState>): string[] {
  const events: string[] = []
  const userData = buildMetaUserData(formState)
  const { leadCategory, isQualifiedLead, formFillerType } = formState

  events.push(trackMetaEvent('mof_v1_page_2_view', userData))

  if (leadCategory === 'bch') {
    events.push(trackMetaEvent('mof_v1_bch_page_2_view', userData))
  } else if (leadCategory === 'lum-l1') {
    events.push(trackMetaEvent('mof_v1_lum_l1_page_2_view', userData))
  } else if (leadCategory === 'lum-l2') {
    events.push(trackMetaEvent('mof_v1_lum_l2_page_2_view', userData))
  }

  if (isQualifiedLead) {
    if (formFillerType === 'parent') {
      events.push(trackMetaEvent('mof_v1_qualfd_prnt_page_2_view', userData))
    } else if (formFillerType === 'student') {
      events.push(trackMetaEvent('mof_v1_qualfd_stdnt_page_2_view', userData))
    }
  }

  return events
}

export function trackPage2Submit(formState: Partial<FormState>): string[] {
  const events: string[] = []
  const userData = buildMetaUserData(formState)
  const { leadCategory, isQualifiedLead, formFillerType } = formState

  events.push(trackMetaEvent('mof_v1_page_2_submit', userData))

  if (leadCategory === 'bch') {
    events.push(trackMetaEvent('mof_v1_bch_page_2_submit', userData))
  } else if (leadCategory === 'lum-l1') {
    events.push(trackMetaEvent('mof_v1_lum_l1_page_2_submit', userData))
  } else if (leadCategory === 'lum-l2') {
    events.push(trackMetaEvent('mof_v1_lum_l2_page_2_submit', userData))
  }

  if (isQualifiedLead) {
    if (formFillerType === 'parent') {
      events.push(trackMetaEvent('mof_v1_qualfd_prnt_page_2_submit', userData))
    } else if (formFillerType === 'student') {
      events.push(trackMetaEvent('mof_v1_qualfd_stdnt_page_2_submit', userData))
    }
  }

  return events
}

export function trackFormComplete(formState: Partial<FormState>): string[] {
  const events: string[] = []
  const userData = buildMetaUserData(formState)
  const { leadCategory, isQualifiedLead, formFillerType } = formState

  events.push(trackMetaEvent('mof_v1_form_complete', userData))

  if (leadCategory === 'bch') {
    events.push(trackMetaEvent('mof_v1_bch_form_complete', userData))
  } else if (leadCategory === 'lum-l1') {
    events.push(trackMetaEvent('mof_v1_lum_l1_form_complete', userData))
  } else if (leadCategory === 'lum-l2') {
    events.push(trackMetaEvent('mof_v1_lum_l2_form_complete', userData))
  }

  if (isQualifiedLead) {
    if (formFillerType === 'parent') {
      events.push(trackMetaEvent('mof_v1_qualfd_prnt_form_complete', userData))
    } else if (formFillerType === 'student') {
      events.push(trackMetaEvent('mof_v1_qualfd_stdnt_form_complete', userData))
    }
  }

  return events
}

export function trackPrimaryClassificationEvents(formState: Partial<FormState>): string[] {
  const events: string[] = []
  const userData = buildMetaUserData(formState)

  const classificationData: LeadClassificationData = {
    formFillerType: formState.formFillerType as 'parent' | 'student',
    currentGrade: formState.currentGrade,
    scholarshipRequirement: formState.scholarshipRequirement,
    targetGeographies: formState.targetGeographies,
    gpaValue: formState.gpaValue,
    percentageValue: formState.percentageValue,
    gradeFormat: formState.gradeFormat,
    leadCategory: formState.leadCategory || undefined
  }

  const isSpam = isSpamLead(classificationData)
  const isParent = formState.formFillerType === 'parent'
  const isStudent = formState.formFillerType === 'student'

  if (isParent) {
    if (isSpam) {
      events.push(trackMetaEvent('mof_v1_spam_prnt', userData))
    } else {
      events.push(trackMetaEvent('mof_v1_prnt_event', userData))

      const isQualified = formState.leadCategory && ['bch', 'lum-l1', 'lum-l2'].includes(formState.leadCategory)

      if (isQualified) {
        events.push(trackMetaEvent('mof_v1_qualfd_prnt', userData))
      } else {
        events.push(trackMetaEvent('mof_v1_disqualfd_prnt', userData))
      }
    }
  } else if (isStudent) {
    const simulatedCategory = simulateStudentAsParent(classificationData)
    const wouldQualify = ['bch', 'lum-l1', 'lum-l2'].includes(simulatedCategory)

    if (isSpam) {
      events.push(trackMetaEvent('mof_v1_spam_stdnt', userData))
    } else {
      events.push(trackMetaEvent('mof_v1_stdnt', userData))
    }

    if (wouldQualify) {
      events.push(trackMetaEvent('mof_v1_qualfd_stdnt', userData))
    } else {
      events.push(trackMetaEvent('mof_v1_disqualfd_stdnt', userData))
    }
  }

  return events
}

export function trackPage1CompleteWithCategory(formState: Partial<FormState>): string[] {
  const events: string[] = []
  const userData = buildMetaUserData(formState)
  const leadCategory = formState.leadCategory
  const isQualified = leadCategory && ['bch', 'lum-l1', 'lum-l2'].includes(leadCategory)

  events.push(trackMetaEvent('mof_v1_page_1_continue', userData))

  if (leadCategory === 'bch') {
    events.push(trackMetaEvent('mof_v1_bch_page_1_continue', userData))
  } else if (leadCategory === 'lum-l1') {
    events.push(trackMetaEvent('mof_v1_lum_l1_page_1_continue', userData))
  } else if (leadCategory === 'lum-l2') {
    events.push(trackMetaEvent('mof_v1_lum_l2_page_1_continue', userData))
  }

  if (isQualified) {
    if (formState.formFillerType === 'parent') {
      events.push(trackMetaEvent('mof_v1_qualfd_prnt_page_1_continue', userData))
    } else if (formState.formFillerType === 'student') {
      const classificationData: LeadClassificationData = {
        formFillerType: formState.formFillerType,
        currentGrade: formState.currentGrade,
        scholarshipRequirement: formState.scholarshipRequirement,
        targetGeographies: formState.targetGeographies,
        gpaValue: formState.gpaValue,
        percentageValue: formState.percentageValue,
        gradeFormat: formState.gradeFormat
      }
      const simulatedCategory = simulateStudentAsParent(classificationData)
      const wouldQualify = ['bch', 'lum-l1', 'lum-l2'].includes(simulatedCategory)
      if (wouldQualify) {
        events.push(trackMetaEvent('mof_v1_qualfd_stdnt_page_1_continue', userData))
      }
    }
  }

  return events
}

export function trackMofPageView(): string[] {
  return [trackMetaEvent('mof_v1_page_view')]
}

export function trackMofCtaClick(ctaType: 'book_call' | 'request_evaluation'): string[] {
  const events: string[] = []

  // Common event that fires for ALL CTA clicks
  events.push(trackMetaEvent('mof_v1_cta_click'))

  // Specific event based on button type
  if (ctaType === 'book_call') {
    events.push(trackMetaEvent('mof_v1_book_call'))
  } else if (ctaType === 'request_evaluation') {
    events.push(trackMetaEvent('mof_v1_request_evaluation'))
  }

  return events
}

export function trackMofStickyCtaClick(): string[] {
  const events: string[] = []

  // Common event that fires for ALL CTA clicks
  events.push(trackMetaEvent('mof_v1_cta_click'))

  // Specific event for sticky CTA
  events.push(trackMetaEvent('mof_v1_sticky_cta_click'))

  return events
}

export function trackCallScheduled(formState: Partial<FormState>): string[] {
  const userData = buildMetaUserData(formState)
  return [trackMetaEvent('mof_v1_call_scheduled', userData)]
}
