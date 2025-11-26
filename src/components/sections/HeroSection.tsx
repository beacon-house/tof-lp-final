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


      <div className="relative z-10 max-w-content mx-auto px-6 md:px-8 lg:px-12 py-4 md:py-12 lg:py-16">
        <div className="max-w-text mx-auto text-center">
          {/* Stat pill with animation */}
          <div className="flex flex-col items-center justify-center gap-2 mb-3 md:mb-6 opacity-0 animate-fade-in-up">
            <StatPill />
          </div>

          {/* Hero headline with staggered animation */}
          <h1 className="text-[1.75rem] leading-[1.2] md:text-4xl lg:text-5xl font-serif font-bold text-navy mb-3 md:mb-5 opacity-0 animate-fade-in-up-delay tracking-tight">
            The Hardest Part of Admissions Is Knowing What Actually Matters.
          </h1>

          {/* Subheadline with emphasis on clarity */}
          <p className="text-sm md:text-lg lg:text-xl text-navy/70 mb-4 md:mb-6 leading-[1.6] font-light opacity-0 animate-fade-in-up-delay-2 max-w-2xl mx-auto">
            For most students, the real challenge isn't marks —<br className="hidden sm:inline" />
            it's not having <span className="cursive-keyword">clarity</span> on the path.
          </p>

          {/* CTA Button with glow effect */}
          <div className="opacity-0 animate-fade-in-up-delay-2 mb-3 md:mb-6 flex justify-center">
            <Button
              onClick={onLearnMore}
              variant="primary"
              className="min-w-[220px] shadow-glow hover:shadow-luxury transition-all duration-300 hover:scale-105 text-base md:text-lg font-semibold flex items-center justify-center"
            >
              Request an Evaluation
            </Button>
          </div>

          {/* Trust badges with enhanced styling */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-xs md:text-sm font-medium text-navy/80 opacity-0 animate-fade-in-up-delay-2">
            <span>35+ top IB & IGCSE schools</span>
            <span className="hidden md:inline text-navy/40">|</span>
            <span>150+ Former Admissions Officers</span>
            <span className="hidden md:inline text-navy/40">|</span>
            <span>Founder Led Guidance</span>
          </div>

          {/* Closing Line */}
          <div className="mt-3 md:mt-6 opacity-0 animate-fade-in-up-delay-3">
            <p className="text-base md:text-xl font-serif text-navy/90">
              Start with <span className="cursive-keyword">clarity</span>.
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="mt-3 md:mt-6 flex justify-center opacity-0 animate-fade-in-up-delay-2">
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
