// Sticky header with minimal clean design
import React, { useState, useEffect } from 'react'

interface HeaderProps {
  showStickyCTA?: boolean
  onCTAClick?: () => void
  onNavigate?: (sectionId: string) => void
}

export const Header: React.FC<HeaderProps> = ({ showStickyCTA = false, onCTAClick, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id)
    }
    setIsMobileMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-luxury transition-all duration-300 ${
          isScrolled ? 'shadow-luxury border-b border-gold/10' : 'bg-white/80'
        }`}
      >
        <div className="max-w-content mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button
              onClick={scrollToTop}
              className="flex-shrink-0 max-w-[60%] md:max-w-none cursor-pointer"
              aria-label="Go to top"
            >
              <img
                src="/bh-ig-logo.png"
                alt="Beacon House"
                className="h-7 md:h-10 w-auto hover:scale-105 transition-transform duration-300"
              />
            </button>

            <nav className="hidden md:flex items-center gap-6">
              {!showStickyCTA ? (
                <>
                  <button
                    onClick={() => handleNavClick('pain-point')}
                    className="text-navy hover:text-gold transition-colors font-medium text-sm relative group"
                  >
                    The Challenge
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></span>
                  </button>
                  <button
                    onClick={() => handleNavClick('about')}
                    className="text-navy hover:text-gold transition-colors font-medium text-sm relative group"
                  >
                    About Us
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></span>
                  </button>
                  <button
                    onClick={() => handleNavClick('results')}
                    className="text-navy hover:text-gold transition-colors font-medium text-sm relative group"
                  >
                    Results
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></span>
                  </button>
                  <button
                    onClick={() => handleNavClick('process')}
                    className="text-navy hover:text-gold transition-colors font-medium text-sm relative group"
                  >
                    Our Process
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavClick('about')}
                    className="text-navy hover:text-gold transition-colors font-medium text-sm relative group"
                  >
                    About
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></span>
                  </button>
                  <button
                    onClick={() => handleNavClick('results')}
                    className="text-navy hover:text-gold transition-colors font-medium text-sm relative group"
                  >
                    Results
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></span>
                  </button>
                  <button
                    onClick={onCTAClick}
                    className="h-10 px-6 rounded-lg font-semibold text-sm bg-gradient-to-r from-gold to-goldLight text-navy shadow-sm hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 animate-fade-in"
                  >
                    Book a Founder Strategy Call
                  </button>
                </>
              )}
            </nav>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-navy hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-[#ffffff] z-[999] shadow-2xl">
          <nav className="px-6 py-8 space-y-4 h-full overflow-y-auto bg-white">
            <button
              onClick={() => handleNavClick('pain-point')}
              className="block w-full text-left py-4 px-4 text-navy text-xl font-semibold hover:text-gold hover:bg-gold/10 rounded-xl transition-all"
            >
              The Challenge
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="block w-full text-left py-4 px-4 text-navy text-xl font-semibold hover:text-gold hover:bg-gold/10 rounded-xl transition-all"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('results')}
              className="block w-full text-left py-4 px-4 text-navy text-xl font-semibold hover:text-gold hover:bg-gold/10 rounded-xl transition-all"
            >
              Results
            </button>
            <button
              onClick={() => handleNavClick('process')}
              className="block w-full text-left py-4 px-4 text-navy text-xl font-semibold hover:text-gold hover:bg-gold/10 rounded-xl transition-all"
            >
              Our Process
            </button>
          </nav>
        </div>
      )}
    </>
  )
}
