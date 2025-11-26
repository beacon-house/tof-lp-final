// Main App component integrating all sections
import { useState } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { StickyMobileCTA } from './components/StickyMobileCTA'
import { HeroSection } from './components/sections/HeroSection'
import { PainPointSection } from './components/sections/PainPointSection'
import { AuthoritySection } from './components/sections/AuthoritySection'
import { BridgeSection } from './components/sections/BridgeSection'
import { WhoWeAreSection } from './components/sections/WhoWeAreSection'
import { ResultsSection } from './components/sections/ResultsSection'
import { ProcessSection } from './components/sections/ProcessSection'
import { TrustSection } from './components/sections/TrustSection'
import { FinalCloseSection } from './components/sections/FinalCloseSection'
import { LeadCaptureModal } from './components/LeadCaptureModal'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'call' | 'evaluation'>('call')

  const handleLearnMore = () => {
    const painPointSection = document.getElementById('pain-point')
    if (painPointSection) {
      painPointSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleUnderstandApproach = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleBookCall = () => {
    setModalType('call')
    setIsModalOpen(true)
  }

  const handleRequestEvaluation = () => {
    setModalType('evaluation')
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      <main>
        <HeroSection onLearnMore={handleLearnMore} />
        <PainPointSection />
        <AuthoritySection />
        <BridgeSection onCTAClick={handleUnderstandApproach} />
        <WhoWeAreSection />
        <ResultsSection />
        <ProcessSection />
        <TrustSection />
        <FinalCloseSection
          onPrimaryCTA={handleBookCall}
          onSecondaryCTA={handleRequestEvaluation}
        />
      </main>

      <Footer />

      <StickyMobileCTA onClick={handleBookCall} />

      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
      />
    </div>
  )
}

export default App
