// Premium footer with gold accents and enhanced styling
import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-navy text-white overflow-hidden">
      {/* Decorative gold accent divider at top */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>

      {/* Decorative pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-8 left-1/4 w-32 h-32 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-8 right-1/4 w-40 h-40 bg-goldLight rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-content mx-auto px-6 py-12 md:py-16">
        {/* Main content */}
        <div className="text-center mb-8">
          {/* Logo/Brand */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-gold rounded-full animate-glow-pulse"></div>
            <span className="font-serif text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-cream bg-clip-text text-transparent">
              Beacon House
            </span>
            <div className="w-2 h-2 bg-gold rounded-full animate-glow-pulse"></div>
          </div>

          {/* Tagline */}
          <p className="text-sm md:text-base text-cream/80 max-w-md mx-auto mb-8 leading-relaxed">
            Guiding families toward clarity, direction, and outcomes that matter.
          </p>

          {/* Social/Contact Links (placeholder for future) */}
          <div className="flex justify-center gap-4 mb-8">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 border border-gold/20 flex items-center justify-center hover:bg-gold/20 hover:border-gold/40 hover:shadow-glow transition-all duration-300 hover:scale-110"
              aria-label="Contact"
            >
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 border border-gold/20 flex items-center justify-center hover:bg-gold/20 hover:border-gold/40 hover:shadow-glow transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-6"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs md:text-sm text-cream/60 font-medium">
            © {new Date().getFullYear()} Beacon House. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
