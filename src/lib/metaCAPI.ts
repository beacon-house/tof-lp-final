// Meta Conversions API (CAPI) utility functions
// Handles server-side event tracking to Meta via Supabase Edge Functions

import { MetaUserData } from './metaEvents'
import { shouldLog } from './logger'

export function generateEventId(sessionId: string, eventName: string, counter: number): string {
  const timestamp = Date.now()
  return `${sessionId}_${eventName}_${timestamp}_${counter}`
}

/**
 * Sanitizes URL by removing sensitive query parameters that might contain PII
 * Preserves UTM parameters and other non-sensitive query params
 */
function sanitizeEventSourceUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    
    // Remove sensitive query parameters that might contain PII
    const sensitiveParams = [
      'phone', 'email', 'name', 'parentName', 'studentName',
      'ph', 'em', 'fn', 'ln', 'ct',
      'countryCode', 'phoneNumber'
    ]
    
    sensitiveParams.forEach(param => {
      urlObj.searchParams.delete(param)
    })
    
    // Return sanitized URL (origin + pathname + remaining query params)
    return urlObj.toString()
  } catch (error) {
    // If URL parsing fails, return origin + pathname only
    if (typeof window !== 'undefined') {
      return window.location.origin + window.location.pathname
    }
    return url
  }
}

export async function sendCAPIEvent(
  eventName: string,
  userData: MetaUserData,
  eventId: string
): Promise<boolean> {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    if (!supabaseUrl) {
      if (shouldLog()) {
        console.error('[CAPI] Missing VITE_SUPABASE_URL')
      }
      return false
    }

    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    if (!anonKey) {
      if (shouldLog()) {
        console.error('[CAPI] Missing VITE_SUPABASE_ANON_KEY')
      }
      return false
    }

    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/meta-capi`

    // Get and sanitize event_source_url
    const eventSourceUrl = typeof window !== 'undefined' 
      ? sanitizeEventSourceUrl(window.location.href)
      : undefined

    const payload = {
      event_name: eventName,
      user_data: userData,
      event_id: eventId,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: eventSourceUrl
    }

    if (shouldLog()) {
      console.log('[CAPI] Calling Edge Function:', edgeFunctionUrl)
      console.log('[CAPI] Payload:', JSON.stringify(payload, null, 2))
    }

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
      if (shouldLog()) {
        console.error('[CAPI] Failed to send event:', response.status, response.statusText)
        console.error('[CAPI] Response:', responseText)
      }
      return false
    }

    if (shouldLog()) {
      console.log('[CAPI] Successfully sent event:', response.status)
      console.log('[CAPI] Response:', responseText)
    }
    return true
  } catch (error) {
    if (shouldLog()) {
      console.error('[CAPI] Error sending event:', error)
    }
    return false
  }
}

