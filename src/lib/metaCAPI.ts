// Meta Conversions API (CAPI) utility functions
// Handles server-side event tracking to Meta via Supabase Edge Functions

import { MetaUserData } from './metaEvents'

export function generateEventId(sessionId: string, eventName: string, counter: number): string {
  const timestamp = Date.now()
  return `${sessionId}_${eventName}_${timestamp}_${counter}`
}

export async function sendCAPIEvent(
  eventName: string,
  userData: MetaUserData,
  eventId: string
): Promise<boolean> {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    if (!supabaseUrl) {
      console.error('[CAPI] Missing VITE_SUPABASE_URL')
      return false
    }

    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    if (!anonKey) {
      console.error('[CAPI] Missing VITE_SUPABASE_ANON_KEY')
      return false
    }

    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/meta-capi`

    const payload = {
      event_name: eventName,
      user_data: userData,
      event_id: eventId,
      event_time: Math.floor(Date.now() / 1000)
    }

    console.log('[CAPI] Calling Edge Function:', edgeFunctionUrl)
    console.log('[CAPI] Payload:', JSON.stringify(payload, null, 2))

    const response = await fetch(edgeFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`
      },
      body: JSON.stringify(payload)
    })

    const responseText = await response.text()
    
    if (!response.ok) {
      console.error('[CAPI] Failed to send event:', response.status, response.statusText)
      console.error('[CAPI] Response:', responseText)
      return false
    }

    console.log('[CAPI] Successfully sent event:', response.status)
    console.log('[CAPI] Response:', responseText)
    return true
  } catch (error) {
    console.error('[CAPI] Error sending event:', error)
    return false
  }
}

