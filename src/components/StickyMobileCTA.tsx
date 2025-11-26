// Sticky mobile CTA button that appears after first scroll - thumb-friendly position at bottom
import React, { useState, useEffect } from 'react'

interface StickyMobileCTAProps {
  onClick: () => void
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 100vh (one full screen)
      setIsVisible(window.scrollY > window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
      <div className="px-4 pb-4 pointer-events-auto">
        <button
          onClick={onClick}
          className="group relative w-full bg-gradient-to-r from-gold to-goldLight text-navy py-4 px-6 rounded-xl font-bold text-base shadow-glow hover:shadow-luxury transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
        >
          {/* Subtle pulse animation background */}
          <div className="absolute inset-0 bg-gradient-to-r from-goldLight to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Button content */}
          <span className="relative flex items-center justify-center gap-2">
            Book a Strategy Call
            {/* Arrow icon that slides on hover */}
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  )
}
