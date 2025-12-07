// Main App component integrating all sections with progressive reveal functionality
import { useState, useRef, useEffect } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HeroSection } from './components/sections/HeroSection'
import { FormSection } from './components/sections/FormSection'
import { PainPointSection } from './components/sections/PainPointSection'
import { AuthoritySection } from './components/sections/AuthoritySection'
import { BridgeSection } from './components/sections/BridgeSection'
import { AchievementsSection } from './components/sections/AchievementsSection'
import { WhoWeAreSection } from './components/sections/WhoWeAreSection'
import { ResultsSection } from './components/sections/ResultsSection'
import { ProcessSection } from './components/sections/ProcessSection'
import { TrustSection } from './components/sections/TrustSection'
import { initializeMetaPixel, trackPageView } from './lib/metaEvents'

function App() {
  const [showFirstGroup, setShowFirstGroup] = useState(false)
  const [showSecondGroup, setShowSecondGroup] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  const firstGroupRef = useRef<HTMLDivElement>(null)
  const secondGroupRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const firstTriggerRef = useRef<HTMLDivElement>(null)
  const secondTriggerRef = useRef<HTMLDivElement>(null)
  const bridgeSectionRef = useRef<HTMLDivElement>(null)
  const trustSectionRef = useRef<HTMLDivElement>(null)
  const painPointRef = useRef<HTMLDivElement>(null)
  const achievementsRef = useRef<HTMLDivElement>(null)

  const handleLearnMore = () => {
    setShowFirstGroup(true)
    setTimeout(() => {
      if (painPointRef.current) {
        const headerOffset = window.innerWidth < 768 ? 64 : 80
        const elementPosition = painPointRef.current.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  const handleUnderstandApproach = () => {
    setShowSecondGroup(true)
    setTimeout(() => {
      if (achievementsRef.current) {
        const headerOffset = window.innerWidth < 768 ? 64 : 80
        const elementPosition = achievementsRef.current.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  const handleShowForm = () => {
    setShowForm(true)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }

  useEffect(() => {
    console.log('🎯 Initializing Meta Pixel and tracking page view...')
    initializeMetaPixel()
    trackPageView()
  }, [])

  useEffect(() => {
    const firstObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !showFirstGroup) {
            setShowFirstGroup(true)
            firstObserver.disconnect()
          }
        })
      },
      { threshold: 0, rootMargin: '100px' }
    )

    const secondObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !showSecondGroup) {
            setShowSecondGroup(true)
            secondObserver.disconnect()
          }
        })
      },
      { threshold: 0, rootMargin: '100px' }
    )

    if (firstTriggerRef.current) {
      firstObserver.observe(firstTriggerRef.current)
    }

    if (secondTriggerRef.current && showFirstGroup) {
      secondObserver.observe(secondTriggerRef.current)
    }

    return () => {
      firstObserver.disconnect()
      secondObserver.disconnect()
    }
  }, [showFirstGroup, showSecondGroup])

  useEffect(() => {
    const stickyObserver = new IntersectionObserver(
      (entries) => {
        const bridgeEntry = entries.find(e => e.target === bridgeSectionRef.current)
        const trustEntry = entries.find(e => e.target === trustSectionRef.current)

        if (trustEntry && trustEntry.isIntersecting) {
          setShowStickyCTA(false)
        } else if (bridgeEntry && !bridgeEntry.isIntersecting && bridgeEntry.boundingClientRect.top < 0) {
          setShowStickyCTA(true)
        }
      },
      { threshold: [0, 0.1], rootMargin: '-100px 0px 0px 0px' }
    )

    if (bridgeSectionRef.current) {
      stickyObserver.observe(bridgeSectionRef.current)
    }
    if (trustSectionRef.current) {
      stickyObserver.observe(trustSectionRef.current)
    }

    return () => {
      stickyObserver.disconnect()
    }
  }, [showFirstGroup, showSecondGroup])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header showStickyCTA={showStickyCTA && !showForm} onCTAClick={handleShowForm} />

      <main className={showForm ? 'hidden' : ''}>
        <HeroSection onLearnMore={handleLearnMore} />

        <div ref={firstTriggerRef} className="h-1" />

        <div ref={firstGroupRef} className={`transition-all duration-500 ${showFirstGroup ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
          <PainPointSection ref={painPointRef} />
          <AuthoritySection />
          <div ref={bridgeSectionRef}>
            <BridgeSection onUnderstandApproach={handleUnderstandApproach} />
          </div>
        </div>

        <div ref={secondTriggerRef} className="h-1" />

        <div ref={secondGroupRef} className={`transition-all duration-500 ${showSecondGroup ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
          <AchievementsSection ref={achievementsRef} />
          <WhoWeAreSection />
          <ResultsSection />
          <ProcessSection />
          <div ref={trustSectionRef}>
            <TrustSection onShowForm={handleShowForm} />
          </div>
        </div>
      </main>

      {showForm && (
        <div ref={formRef} className="w-full">
          <FormSection onClose={handleCloseForm} />
        </div>
      )}

      {showStickyCTA && !showForm && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-navy/10 shadow-luxury animate-fade-in">
          <div className="max-w-content mx-auto px-6 py-3">
            <button
              onClick={handleShowForm}
              className="w-full h-12 rounded-lg font-semibold text-base bg-gradient-to-r from-gold to-goldLight text-navy shadow-sm hover:shadow-glow transition-all duration-300"
            >
              Book a Founder Strategy Call
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default App
