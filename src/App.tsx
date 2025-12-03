// Main App component integrating all sections
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HeroSection } from './components/sections/HeroSection'
import { PainPointSection } from './components/sections/PainPointSection'
import { AuthoritySection } from './components/sections/AuthoritySection'
import { BridgeSection } from './components/sections/BridgeSection'
import { AchievementsSection } from './components/sections/AchievementsSection'
import { WhoWeAreSection } from './components/sections/WhoWeAreSection'
import { ResultsSection } from './components/sections/ResultsSection'
import { ProcessSection } from './components/sections/ProcessSection'
import { TrustSection } from './components/sections/TrustSection'
import { FinalCloseSection } from './components/sections/FinalCloseSection'

function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      <main>
        <HeroSection />
        <PainPointSection />
        <AuthoritySection />
        <BridgeSection />
        <AchievementsSection />
        <WhoWeAreSection />
        <ResultsSection />
        <ProcessSection />
        <TrustSection />
        <FinalCloseSection />
      </main>

      <Footer />
    </div>
  )
}

export default App
