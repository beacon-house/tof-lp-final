// Section A - Hero section
import React from 'react'
import { StatPill } from '../StatPill'
import { Button } from '../Button'
import { trackHeroCTA } from '../../lib/metaEvents'

interface HeroSectionProps {
  onLearnMore?: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLearnMore }) => {
  const handleCTAClick = () => {
    console.log('🎯 Tracking Hero CTA Click...')
    trackHeroCTA()
    if (onLearnMore) {
      onLearnMore()
    }
  }
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white pt-20 overflow-hidden">
      {/* Animated background gradient rays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray50 to-white"></div>
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


      <div className="relative z-10 max-w-content mx-auto px-6 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trustpilot pill with animation */}
          <div className="flex flex-col items-center justify-center gap-2 mb-3 md:mb-5 opacity-0 animate-fade-in-up">
            <StatPill />
          </div>

          {/* Hero headline with staggered animation */}
          <h1 className="text-[1.75rem] leading-[1.35] md:text-4xl md:leading-[1.3] lg:text-5xl lg:leading-[1.3] font-serif font-bold text-navy mb-3 md:mb-4 opacity-0 animate-fade-in-up-delay tracking-tight">
            The hardest part of admissions is knowing what{' '}
            <span className="relative inline-block">
              <span className="relative z-10">actually matters.</span>
              <span className="absolute inset-0 bg-goldLight/30 -skew-y-1 rounded" style={{ top: '20%', bottom: '20%', left: '-4px', right: '-4px' }}></span>
            </span>
          </h1>

          {/* Subheadline with emphasis on clarity */}
          <p className="text-base md:text-lg lg:text-xl text-navy/70 mb-4 md:mb-5 leading-[1.65] md:leading-[1.7] font-normal opacity-0 animate-fade-in-up-delay-2 max-w-2xl mx-auto">
            For most families, the real challenge<br className="md:hidden" /> isn't marks. It's <span className="cursive-keyword">clarity</span>.
          </p>

          {/* Trust stat boxes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-5 md:mb-8 opacity-0 animate-fade-in-up-delay-2 max-w-4xl mx-auto">
            {/* Box 1 */}
            <div className="bg-white rounded-2xl p-3 md:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-navy" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-bold text-base md:text-lg text-navy mb-0.5">120+ Ivy League</p>
                <p className="text-xs md:text-sm text-navy/60">admits in 2025</p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-white rounded-2xl p-3 md:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-navy" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-bold text-base md:text-lg text-navy mb-0.5">Trusted By</p>
                <p className="text-xs md:text-sm text-navy/60">IB & IGCSE community
</p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-white rounded-2xl p-3 md:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-navy" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-bold text-base md:text-lg text-navy mb-0.5">Guided By</p>
                <p className="text-xs md:text-sm text-navy/60">Former Admissions Officers</p>
              </div>
            </div>

            {/* Box 4 */}
            <div className="bg-white rounded-2xl p-3 md:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-navy" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-bold text-base md:text-lg text-navy mb-0.5">Founder-led</p>
                <p className="text-xs md:text-sm text-navy/60">small cohorts</p>
              </div>
            </div>
          </div>

          {/* Target audience text */}
          <p className="text-xs md:text-sm text-navy/60 mb-5 md:mb-6 opacity-0 animate-fade-in-up-delay-2">
            Designed for ambitious IB and IGCSE families<br className="md:hidden" /> across Grades 8–12.
          </p>

          {/* CTA Button */}
          <div>
            <Button onClick={handleCTAClick}>
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
