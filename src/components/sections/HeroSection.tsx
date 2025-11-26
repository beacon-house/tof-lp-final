// Section A - Hero section with Learn More CTA
import React from 'react'
import { Button } from '../Button'
import { StatPill } from '../StatPill'

export const HeroSection: React.FC<{ onLearnMore: () => void }> = ({ onLearnMore }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-cream pt-20 overflow-hidden">
      {/* Animated background gradient rays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-sage to-cream"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse 1200px 800px at 50% 30%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)',
          }}
        ></div>
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #001F3F 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-[10%] w-2 h-2 bg-gold/30 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-40 right-[15%] w-3 h-3 bg-gold/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-[20%] w-2 h-2 bg-navy/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-content mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="max-w-text mx-auto text-center">
          {/* Stat pill with animation */}
          <div className="flex flex-col items-center justify-center gap-3 mb-6 md:mb-10 opacity-0 animate-fade-in-up">
            <StatPill />
          </div>

          {/* Hero headline with staggered animation */}
          <h1 className="text-[2.5rem] leading-[1.15] md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-navy mb-6 md:mb-8 opacity-0 animate-fade-in-up-delay tracking-tight">
            The Hardest Part of Admissions Is Knowing What Actually Matters.
          </h1>

          {/* Subheadline with emphasis on clarity */}
          <p className="text-lg md:text-xl lg:text-2xl text-navy/70 mb-8 md:mb-10 leading-relaxed font-light opacity-0 animate-fade-in-up-delay-2 max-w-2xl mx-auto">
            For most students, the real challenge isn't marks —<br className="hidden sm:inline" />
            it's not having <span className="cursive-keyword">clarity</span> on the path.
          </p>

          {/* CTA Button with glow effect */}
          <div className="opacity-0 animate-fade-in-up-delay-2 mb-8 md:mb-10">
            <Button
              onClick={onLearnMore}
              variant="primary"
              className="min-w-[220px] shadow-glow hover:shadow-luxury transition-all duration-300 hover:scale-105 text-base md:text-lg py-4 md:py-5 px-8 md:px-10 font-semibold"
            >
              Learn More
            </Button>
          </div>

          {/* Trust badges with enhanced styling */}
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm md:text-base font-medium text-navy/80 opacity-0 animate-fade-in-up-delay-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
              <span className="whitespace-nowrap">35+ top IB & IGCSE schools</span>
            </div>
            <span className="hidden sm:inline text-gold/40">•</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
              <span className="whitespace-nowrap">150+ Former Admissions Officers</span>
            </div>
            <span className="hidden sm:inline text-gold/40">•</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
              <span className="whitespace-nowrap font-semibold text-navy">Founder Led Guidance</span>
            </div>
          </div>

          {/* Closing Line */}
          <div className="mt-8 md:mt-10 opacity-0 animate-fade-in-up-delay-3">
            <p className="text-xl md:text-2xl font-serif text-navy/90">
              Start with <span className="cursive-keyword">clarity</span>.
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="mt-8 md:mt-12 flex justify-center opacity-0 animate-fade-in-up-delay-2">
            <div className="animate-float">
              <svg
                className="w-6 h-6 md:w-7 md:h-7 text-gold/60"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
