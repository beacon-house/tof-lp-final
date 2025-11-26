// Section H - Trust + Proof section
import React from 'react'
import { Section } from '../Section'

const trustPoints = [
  {
    text: '150+ Former Admissions Officers',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
      </svg>
    )
  },
  {
    text: 'Students from 35+ top IB & IGCSE schools',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
      </svg>
    )
  },
  {
    text: 'Small cohorts, high involvement',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    text: 'Founder-led relationship oversight',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    text: 'Integrated FAO + GC delivery model',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
      </svg>
    )
  },
  {
    text: 'Calm, structured, clarity-first guidance',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    )
  }
]

export const TrustSection: React.FC = () => {
  return (
    <Section id="trust" className="relative py-16 md:py-20 flex items-center bg-gradient-to-br from-white via-sage to-cream">
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Marker */}


        {/* Three Opening Lines */}
        <div className="text-center mb-12 md:mb-16 space-y-4 md:space-y-5">
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-navy leading-tight font-light">
            Admissions doesn't have to feel chaotic.
          </p>
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-navy leading-tight font-medium">
            Clarity is possible.
          </p>
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-navy leading-tight font-bold">
            And it changes <span className="cursive-keyword">everything</span>.
          </p>
          <div className="flex justify-center pt-4">
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-gold to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Mobile: Horizontal Scroll, Desktop: Grid */}
        <div className="w-full overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:pb-0 scrollbar-hide md:overflow-visible">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-max md:w-full">
            {trustPoints.map((point, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[280px] md:w-auto snap-start group relative bg-white p-5 md:p-6 rounded-2xl border border-gold/10 shadow-sm hover:shadow-luxury transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Decorative gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/20 to-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-gold to-goldLight flex items-center justify-center mr-4 text-white group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    {point.icon}
                  </div>
                  <p className="text-sm md:text-base text-navy font-semibold leading-snug pt-2 whitespace-normal">
                    {point.text}
                  </p>
                </div>

                {/* Animated corner accent */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full opacity-0 group-hover:opacity-100 animate-glow-pulse transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Line */}
        <div className="text-center mt-10 md:mt-12">
          <p className="text-xl md:text-2xl font-serif text-navy/90">
            Trust built on <span className="cursive-keyword">results</span>.
          </p>
        </div>
      </div>
    </Section>
  )
}
