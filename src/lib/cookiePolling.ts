import { shouldLog } from './logger'

interface QueuedEvent {
  eventName: string
  userData?: any
  timestamp: number
}

class CookiePollingManager {
  private isPolling = false
  private cookiesReady = false
  private eventQueue: QueuedEvent[] = []
  private pollingInterval: number | null = null
  private checkCount = 0
  private readonly maxChecks = 20
  private readonly checkIntervalMs = 100
  private readonly maxWaitMs = 2000

  getCookie(name: string): string | undefined {
    if (typeof document === 'undefined') {
      return undefined
    }

    const cookies = document.cookie.split(';')

    for (const cookie of cookies) {
      const trimmed = cookie.trim()
      if (trimmed.startsWith(name + '=')) {
        return trimmed.substring(name.length + 1)
      }
    }

    return undefined
  }

  areCookiesReady(): boolean {
    const fbp = this.getCookie('_fbp')
    const fbc = this.getCookie('_fbc')

    return !!(fbp || fbc)
  }

  startPolling(onReady: () => void): void {
    if (this.isPolling || this.cookiesReady) {
      return
    }

    if (shouldLog()) {
      console.log('🍪 Starting cookie polling...')
    }

    if (this.areCookiesReady()) {
      if (shouldLog()) {
        console.log('✅ Cookies already available, processing queue immediately')
      }
      this.cookiesReady = true
      onReady()
      return
    }

    this.isPolling = true
    this.checkCount = 0

    this.pollingInterval = window.setInterval(() => {
      this.checkCount++

      if (shouldLog()) {
        console.log(`🔍 Cookie check ${this.checkCount}/${this.maxChecks}`)
      }

      if (this.areCookiesReady()) {
        if (shouldLog()) {
          console.log(`✅ Cookies found after ${this.checkCount} checks (${this.checkCount * this.checkIntervalMs}ms)`)
        }
        this.stopPolling()
        this.cookiesReady = true
        onReady()
        return
      }

      if (this.checkCount >= this.maxChecks) {
        if (shouldLog()) {
          console.warn(`⚠️ Cookie polling timeout after ${this.maxWaitMs}ms - proceeding without cookies`)
        }
        this.stopPolling()
        this.cookiesReady = true
        onReady()
      }
    }, this.checkIntervalMs)
  }

  stopPolling(): void {
    if (this.pollingInterval !== null) {
      clearInterval(this.pollingInterval)
      this.pollingInterval = null
      this.isPolling = false
    }
  }

  queueEvent(eventName: string, userData?: any): void {
    this.eventQueue.push({
      eventName,
      userData,
      timestamp: Date.now()
    })

    if (shouldLog()) {
      console.log(`📥 Event queued: ${eventName} (Queue size: ${this.eventQueue.length})`)
    }
  }

  getQueuedEvents(): QueuedEvent[] {
    return [...this.eventQueue]
  }

  clearQueue(): void {
    if (shouldLog()) {
      console.log(`🗑️ Clearing event queue (${this.eventQueue.length} events)`)
    }
    this.eventQueue = []
  }

  isCookiesReady(): boolean {
    return this.cookiesReady
  }

  reset(): void {
    this.stopPolling()
    this.cookiesReady = false
    this.eventQueue = []
    this.checkCount = 0
  }
}

export const cookiePolling = new CookiePollingManager()
