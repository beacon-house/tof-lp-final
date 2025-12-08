// Main App component integrating all sections with progressive reveal functionality
import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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
import { initializeMetaPixel, trackPageView, trackUnderstandApproachCTA, trackMofPageView } from './lib/metaEvents'

function App() {
  const location = useLocation()
  const [showFirstGroup, setShowFirstGroup] = useState(false)
  const [showSecondGroup, setShowSecondGroup] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  const [stickyCtaActivated, setStickyCtaActivated] = useState(false)
  const [isInProcessSection, setIsInProcessSection] = useState(false)
  const [isInTrustSection, setIsInTrustSection] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const bridgeSectionRef = useRef<HTMLDivElement>(null)
  const trustSectionRef = useRef<HTMLDivElement>(null)
  const processSectionRef = useRef<HTMLDivElement>(null)
  const painPointRef = useRef<HTMLDivElement>(null)
  const achievementsRef = useRef<HTMLDivElement>(null)
  const whoWeAreRef = useRef<HTMLDivElement>(null)

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
    trackUnderstandApproachCTA()
    setShowSecondGroup(true)
    setStickyCtaActivated(true)
    trackMofPageView()
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

  const handleNavigationClick = (sectionId: string) => {
    const firstGroupSections = ['pain-point']
    const secondGroupSections = ['about', 'results', 'comparison', 'process']

    if (firstGroupSections.includes(sectionId)) {
      setShowFirstGroup(true)
    } else if (secondGroupSections.includes(sectionId)) {
      setShowFirstGroup(true)
      setShowSecondGroup(true)
      setStickyCtaActivated(true)
      trackMofPageView()
    }

    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        const headerOffset = window.innerWidth < 768 ? 64 : 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 300)
  }

  useEffect(() => {
    console.log('🎯 Initializing Meta Pixel and tracking page view...')
    initializeMetaPixel()
    trackPageView()
  }, [])

  useEffect(() => {
    if (location.pathname === '/about-us') {
      console.log('🎯 About-us route detected, revealing all sections and scrolling...')
      setShowFirstGroup(true)
      setShowSecondGroup(true)
      setStickyCtaActivated(true)
      trackMofPageView()

      setTimeout(() => {
        const element = document.getElementById('achievements')
        if (element) {
          const headerOffset = window.innerWidth < 768 ? 64 : 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition
          })
        }
      }, 100)
    }
  }, [location.pathname])

  useEffect(() => {
    const stickyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === processSectionRef.current) {
            setIsInProcessSection(entry.isIntersecting)
          }
          if (entry.target === trustSectionRef.current) {
            setIsInTrustSection(entry.isIntersecting)
          }
        })
      },
      { threshold: [0, 0.5], rootMargin: '0px' }
    )

    if (processSectionRef.current) {
      stickyObserver.observe(processSectionRef.current)
    }
    if (trustSectionRef.current) {
      stickyObserver.observe(trustSectionRef.current)
    }

    return () => {
      stickyObserver.disconnect()
    }
  }, [showSecondGroup])

  useEffect(() => {
    if (stickyCtaActivated && !isInProcessSection && !isInTrustSection) {
      setShowStickyCTA(true)
    } else {
      setShowStickyCTA(false)
    }
  }, [stickyCtaActivated, isInProcessSection, isInTrustSection])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header
        showStickyCTA={showStickyCTA && !showForm}
        onCTAClick={handleShowForm}
        onNavigate={handleNavigationClick}
      />

      <main className={showForm ? 'hidden' : ''}>
        <HeroSection onLearnMore={handleLearnMore} />

        <div className={`transition-all duration-200 ${showFirstGroup ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
          <PainPointSection ref={painPointRef} />
          <AuthoritySection />
          <div ref={bridgeSectionRef}>
            <BridgeSection onUnderstandApproach={handleUnderstandApproach} />
          </div>
        </div>

        <div className={`transition-all duration-200 ${showSecondGroup ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
          <AchievementsSection ref={achievementsRef} />
          <div ref={whoWeAreRef}>
            <WhoWeAreSection />
          </div>
          <ResultsSection />
          <div ref={processSectionRef}>
            <ProcessSection />
          </div>
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
