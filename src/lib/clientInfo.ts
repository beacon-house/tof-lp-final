// Client information utility for Meta CAPI tracking
// Handles non-blocking IP address detection and user agent collection

import { shouldLog } from './logger'

// Module-level cache for client IP (populated asynchronously)
let cachedClientIp: string | undefined = undefined
let ipFetchInProgress: boolean = false
let ipFetchAttempted: boolean = false

/**
 * Fetches client IP address from Supabase Edge Function
 * Non-blocking: Returns immediately, populates cache asynchronously
 * Safe to call multiple times - will only fetch once
 */
export async function fetchClientIpAddress(): Promise<void> {
  // If already cached, no need to fetch again
  if (cachedClientIp !== undefined) {
    return
  }

  // If fetch is already in progress, don't start another one
  if (ipFetchInProgress) {
    return
  }

  // Mark that we've attempted to fetch (prevents retries on failure)
  if (ipFetchAttempted) {
    return
  }

  ipFetchInProgress = true
  ipFetchAttempted = true

  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    if (!supabaseUrl) {
      if (shouldLog()) {
        console.warn('[ClientInfo] Missing VITE_SUPABASE_URL, skipping IP fetch')
      }
      ipFetchInProgress = false
      return
    }

    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    if (!anonKey) {
      if (shouldLog()) {
        console.warn('[ClientInfo] Missing VITE_SUPABASE_ANON_KEY, skipping IP fetch')
      }
      ipFetchInProgress = false
      return
    }

    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/get-client-ip`

    if (shouldLog()) {
      console.log('[ClientInfo] Fetching client IP from:', edgeFunctionUrl)
    }

    const response = await fetch(edgeFunctionUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`
      },
      // 5 second timeout to avoid blocking
      signal: AbortSignal.timeout(5000)
    })

    if (!response.ok) {
      if (shouldLog()) {
        console.warn('[ClientInfo] Failed to fetch IP:', response.status, response.statusText)
      }
      ipFetchInProgress = false
      return
    }

    const data = await response.json()

    if (data?.ip && typeof data.ip === 'string') {
      cachedClientIp = data.ip.trim()
      if (shouldLog()) {
        console.log('[ClientInfo] Client IP cached:', cachedClientIp)
      }
    } else {
      if (shouldLog()) {
        console.warn('[ClientInfo] Invalid IP response:', data)
      }
    }
  } catch (error) {
    // Silently fail - events will still fire without IP
    if (shouldLog()) {
      console.warn('[ClientInfo] Error fetching IP (non-blocking):', error)
    }
  } finally {
    ipFetchInProgress = false
  }
}

/**
 * Returns cached client IP address
 * Returns undefined if IP hasn't been fetched yet or fetch failed
 * This allows events to fire without IP rather than waiting
 */
export function getClientIpAddress(): string | undefined {
  return cachedClientIp
}

/**
 * Returns client user agent from navigator
 * Synchronous, always available (unless in SSR environment)
 */
export function getClientUserAgent(): string | undefined {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return undefined
  }

  return navigator.userAgent || undefined
}
