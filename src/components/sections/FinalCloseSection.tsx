import React from 'react'
import { Section } from '../Section'

export const FinalCloseSection: React.FC = () => {
  return (
    <Section id="contact" className="relative py-20 md:py-28 bg-navy overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        {/* Main headline */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-6 md:mb-8 leading-tight">
          Let's start with <span className="cursive-keyword">clarity</span>.
        </h2>

        {/* Subheadline */}
        <p className="text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl mx-auto font-light">
          Your journey to confident, purposeful admissions begins here.
        </p>
      </div>
    </Section>
  )
}
