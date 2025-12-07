import { LeadCategory } from './leadCategorization'

declare global {
  interface Window {
    fbq?: (command: string, eventName: string, params?: Record<string, any>) => void
  }
}

export interface MetaEventData {
  formFillerType?: 'parent' | 'student'
  currentGrade?: string
  scholarshipRequirement?: string
  targetGeographies?: string[]
  gpaValue?: string
  percentageValue?: string
  gradeFormat?: 'gpa' | 'percentage'
  leadCategory?: LeadCategory
  isQualified?: boolean
  isSpam?: boolean
  [key: string]: any
}

function getEnvironmentSuffix(): string {
  const env = import.meta.env.VITE_ENVIRONMENT || 'stg'
  return env === 'prod' ? 'prod' : 'stg'
}

export function isSpamLead(data: MetaEventData): boolean {
  if (data.gradeFormat === 'gpa' && data.gpaValue === '10') {
    return true
  }
  if (data.gradeFormat === 'percentage' && data.percentageValue === '100') {
    return true
  }
  return false
}

export function simulateStudentAsParent(data: MetaEventData): LeadCategory {
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

export function trackMetaEvent(eventName: string, data?: MetaEventData): string {
  const env = getEnvironmentSuffix()
  const fullEventName = `${eventName}_${env}`

  console.log('🎯 META EVENT FIRED:', {
    eventName: fullEventName,
    timestamp: new Date().toISOString(),
    data
  })

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', fullEventName, data)
  }

  return fullEventName
}

export function initializeMetaPixel(): void {
  const pixelId = import.meta.env.VITE_META_PIXEL_ID

  if (typeof window !== 'undefined' && window.fbq && pixelId) {
    window.fbq('init', pixelId)
    window.fbq('track', 'PageView')
    console.log('✅ Meta Pixel Initialized:', pixelId)
  }
}

export function trackPageView(): string[] {
  return [trackMetaEvent('tof_page_view')]
}

export function trackHeroCTA(): string[] {
  return [trackMetaEvent('tof_cta_hero')]
}

export function trackUnderstandApproachCTA(): string[] {
  return [trackMetaEvent('tof_cta_understand_our_approach')]
}

export function trackPage1Continue(): string[] {
  return [trackMetaEvent('tof_page_1_continue')]
}

export function trackPage2View(leadCategory?: LeadCategory, isQualified?: boolean, formFillerType?: 'parent' | 'student'): string[] {
  const events: string[] = []

  events.push(trackMetaEvent('tof_page_2_view'))

  if (leadCategory === 'bch') {
    events.push(trackMetaEvent('tof_bch_page_2_view'))
  } else if (leadCategory === 'lum-l1') {
    events.push(trackMetaEvent('tof_lum_l1_page_2_view'))
  } else if (leadCategory === 'lum-l2') {
    events.push(trackMetaEvent('tof_lum_l2_page_2_view'))
  }

  if (isQualified) {
    if (formFillerType === 'parent') {
      events.push(trackMetaEvent('tof_qualfd_prnt_page_2_view'))
    } else if (formFillerType === 'student') {
      events.push(trackMetaEvent('tof_qualfd_stdnt_page_2_view'))
    }
  }

  return events
}

export function trackPage2Submit(leadCategory?: LeadCategory, isQualified?: boolean, formFillerType?: 'parent' | 'student'): string[] {
  const events: string[] = []

  events.push(trackMetaEvent('tof_page_2_submit'))

  if (leadCategory === 'bch') {
    events.push(trackMetaEvent('tof_bch_page_2_submit'))
  } else if (leadCategory === 'lum-l1') {
    events.push(trackMetaEvent('tof_lum_l1_page_2_submit'))
  } else if (leadCategory === 'lum-l2') {
    events.push(trackMetaEvent('tof_lum_l2_page_2_submit'))
  }

  if (isQualified) {
    if (formFillerType === 'parent') {
      events.push(trackMetaEvent('tof_qualfd_prnt_page_2_submit'))
    } else if (formFillerType === 'student') {
      events.push(trackMetaEvent('tof_qualfd_stdnt_page_2_submit'))
    }
  }

  return events
}

export function trackFormComplete(leadCategory?: LeadCategory, isQualified?: boolean, formFillerType?: 'parent' | 'student'): string[] {
  const events: string[] = []

  events.push(trackMetaEvent('tof_form_complete'))

  if (leadCategory === 'bch') {
    events.push(trackMetaEvent('tof_bch_form_complete'))
  } else if (leadCategory === 'lum-l1') {
    events.push(trackMetaEvent('tof_lum_l1_form_complete'))
  } else if (leadCategory === 'lum-l2') {
    events.push(trackMetaEvent('tof_lum_l2_form_complete'))
  }

  if (isQualified) {
    if (formFillerType === 'parent') {
      events.push(trackMetaEvent('tof_qualfd_prnt_form_complete'))
    } else if (formFillerType === 'student') {
      events.push(trackMetaEvent('tof_qualfd_stdnt_form_complete'))
    }
  }

  return events
}

export function trackPrimaryClassificationEvents(data: MetaEventData): string[] {
  const events: string[] = []
  const isSpam = isSpamLead(data)
  const isParent = data.formFillerType === 'parent'
  const isStudent = data.formFillerType === 'student'

  if (isParent) {
    if (isSpam) {
      events.push(trackMetaEvent('tof_spam_prnt', data))
    } else {
      events.push(trackMetaEvent('tof_prnt_event', data))

      const isQualified = data.leadCategory && ['bch', 'lum-l1', 'lum-l2'].includes(data.leadCategory)

      if (isQualified) {
        events.push(trackMetaEvent('tof_qualfd_prnt', data))
      } else {
        events.push(trackMetaEvent('tof_disqualfd_prnt', data))
      }
    }
  } else if (isStudent) {
    const simulatedCategory = simulateStudentAsParent(data)
    const wouldQualify = ['bch', 'lum-l1', 'lum-l2'].includes(simulatedCategory)

    if (isSpam) {
      events.push(trackMetaEvent('tof_spam_stdnt', data))
    } else {
      events.push(trackMetaEvent('tof_stdnt', data))
    }

    if (wouldQualify) {
      events.push(trackMetaEvent('tof_qualfd_stdnt', data))
    } else {
      events.push(trackMetaEvent('tof_disqualfd_stdnt', data))
    }
  }

  return events
}

export function trackPage1CompleteWithCategory(
  data: MetaEventData,
  leadCategory: LeadCategory
): string[] {
  const events: string[] = []
  const isQualified = ['bch', 'lum-l1', 'lum-l2'].includes(leadCategory)

  events.push(trackMetaEvent('tof_page_1_continue'))

  if (leadCategory === 'bch') {
    events.push(trackMetaEvent('tof_bch_page_1_continue'))
  } else if (leadCategory === 'lum-l1') {
    events.push(trackMetaEvent('tof_lum_l1_page_1_continue'))
  } else if (leadCategory === 'lum-l2') {
    events.push(trackMetaEvent('tof_lum_l2_page_1_continue'))
  }

  if (isQualified) {
    if (data.formFillerType === 'parent') {
      events.push(trackMetaEvent('tof_qualfd_prnt_page_1_continue'))
    } else if (data.formFillerType === 'student') {
      const simulatedCategory = simulateStudentAsParent(data)
      const wouldQualify = ['bch', 'lum-l1', 'lum-l2'].includes(simulatedCategory)
      if (wouldQualify) {
        events.push(trackMetaEvent('tof_qualfd_stdnt_page_1_continue'))
      }
    }
  }

  return events
}
