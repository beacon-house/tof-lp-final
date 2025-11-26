// Sticky header with minimal clean design
import React, { useState, useEffect } from 'react'

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-luxury transition-all duration-300 ${
        isScrolled ? 'shadow-luxury border-b border-gold/10' : 'bg-cream/80'
      }`}
    >
      <div className="max-w-content mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0 max-w-[60%] md:max-w-none">
            <img
              src="/bh-ig-logo.png"
              alt="Beacon House"
              className="h-8 md:h-12 w-auto hover:scale-105 transition-transform duration-300"
            />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-navy hover:text-gold transition-colors font-semibold relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="text-navy hover:text-gold transition-colors font-semibold relative group"
            >
              Process
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection('results')}
              className="text-navy hover:text-gold transition-colors font-semibold relative group"
            >
              Results
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-gold to-goldLight text-navy px-6 py-2.5 rounded-xl font-bold hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              Contact
            </button>
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

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-cream backdrop-blur-2xl bg-opacity-95 z-40 animate-fade-in">
          <nav className="px-6 py-8 space-y-4 h-full">
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left py-4 px-4 text-navy text-xl font-semibold hover:text-gold hover:bg-gold/10 rounded-xl transition-all"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="block w-full text-left py-4 px-4 text-navy text-xl font-semibold hover:text-gold hover:bg-gold/10 rounded-xl transition-all"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection('results')}
              className="block w-full text-left py-4 px-4 text-navy text-xl font-semibold hover:text-gold hover:bg-gold/10 rounded-xl transition-all"
            >
              Results
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left py-4 px-4 text-navy text-xl font-semibold hover:text-gold hover:bg-gold/10 rounded-xl transition-all"
            >
              Contact
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
