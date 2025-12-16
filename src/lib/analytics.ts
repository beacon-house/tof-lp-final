import { FunnelStage } from './formTracking'
import { shouldLog } from './logger'

export function trackFormEvent(eventName: FunnelStage, data?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, data)
  }

  if (shouldLog()) {
    console.log('Form Event:', eventName, data)
  }
}
