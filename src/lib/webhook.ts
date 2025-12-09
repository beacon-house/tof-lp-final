import { FormState } from '../store/formStore'

export interface WebhookPayload {
  session_id: string
  environment: string
  formFillerType: string
  studentName: string
  currentGrade: string
  currentLocation: string
  phoneNumber: string
  curriculumType: string
  gradeFormat: string
  gpaValue: string
  percentageValue: string
  schoolName: string
  scholarshipRequirement: string
  targetGeographiesArray: string[]
  parentName: string
  email: string
  counsellingDate: string
  counsellingTime: string
  lead_category: string | null
  counsellingSlotPicked: boolean
  funnel_stage: string
  is_qualified_lead: boolean
  page_completed: number
  triggeredEventsArray: string[]
  created_at: string
  lead_source: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  utm_id?: string
}

export function buildWebhookPayload(formState: FormState): WebhookPayload {
  const phoneNumber = formState.countryCode && formState.phoneNumber
    ? `${formState.countryCode}${formState.phoneNumber}`
    : ''

  return {
    session_id: formState.sessionId,
    environment: import.meta.env.VITE_ENVIRONMENT || 'unknown',
    formFillerType: formState.formFillerType,
    studentName: formState.studentName,
    currentGrade: formState.currentGrade,
    currentLocation: formState.location,
    phoneNumber: phoneNumber,
    curriculumType: formState.curriculumType,
    gradeFormat: formState.gradeFormat,
    gpaValue: formState.gpaValue,
    percentageValue: formState.percentageValue,
    schoolName: formState.schoolName,
    scholarshipRequirement: formState.scholarshipRequirement,
    targetGeographiesArray: formState.targetGeographies,
    parentName: formState.parentName,
    email: formState.email,
    counsellingDate: formState.selectedDate,
    counsellingTime: formState.selectedSlot,
    lead_category: formState.leadCategory,
    counsellingSlotPicked: formState.selectedSlot !== '',
    funnel_stage: formState.funnelStage,
    is_qualified_lead: formState.isQualifiedLead,
    page_completed: formState.pageCompleted,
    triggeredEventsArray: formState.triggeredEvents,
    created_at: new Date().toISOString(),
    lead_source: 'clarity',
    utm_source: formState.utmParams.utm_source,
    utm_medium: formState.utmParams.utm_medium,
    utm_campaign: formState.utmParams.utm_campaign,
    utm_term: formState.utmParams.utm_term,
    utm_content: formState.utmParams.utm_content,
    utm_id: formState.utmParams.utm_id,
  }
}

export async function sendWebhookData(webhookUrl: string, payload: WebhookPayload): Promise<boolean> {
  try {
    console.log('[webhook] Sending webhook data to:', webhookUrl)
    console.log('[webhook] Payload:', payload)

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error('[webhook] Webhook request failed with status:', response.status)
      return false
    }

    console.log('[webhook] Webhook sent successfully')
    return true
  } catch (error) {
    console.error('[webhook] Error sending webhook:', error)
    return false
  }
}
