// Section C - What Actually Matters Now section
import React from 'react'
import { Section } from '../Section'
import { TextContainer } from '../TextContainer'

export const AuthoritySection: React.FC = () => {
  return (
    <Section id="authority" className="relative min-h-screen flex items-center bg-cream">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
        <div className="relative h-[350px] md:h-[450px] lg:h-[600px] order-2 lg:order-1">
          {/* Decorative elements */}
          <div className="absolute -top-8 -left-8 w-40 h-40 bg-navy/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gold/10 rounded-full blur-3xl"></div>

          {/* Image container */}
          <div className="relative h-full rounded-3xl overflow-hidden shadow-luxury group">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
              alt="Students engaged in meaningful learning"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy/10 via-transparent to-gold/10"></div>
          </div>
        </div>

        <TextContainer className="order-1 lg:order-2">


          <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-navy mb-10 md:mb-12 leading-tight font-medium">
            In today's admissions world, what matters is:
          </p>

          {/* Mobile: Horizontal Scroll, Desktop: Vertical List */}
          <div className="w-full overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:pb-0 scrollbar-hide md:overflow-visible">
            <ul className="flex md:flex-col gap-4 md:gap-6 w-max md:w-full">
              {[
                { main: 'Real strengths', sub: 'not a long list of activities' },
                { main: 'Authentic curiosity & initiative', sub: 'not checkbox achievements' },
                { main: 'Depth', sub: 'not activity collecting' },
                { main: 'Direction that connects interests to pathways', sub: 'not scattered interests' },
                { main: 'A story that stays consistent across Grades 8–12', sub: 'not last-minute scrambling' }
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex-shrink-0 w-[280px] md:w-auto snap-start group hover:translate-x-2 transition-transform duration-300"
                >
                  <div className="flex items-start p-4 md:p-5 bg-white/60 backdrop-blur-sm rounded-2xl border border-navy/5 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-gold to-goldLight flex items-center justify-center mr-4 mt-0.5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-base md:text-lg lg:text-xl text-navy font-semibold leading-snug mb-1 whitespace-normal">
                        {item.main}
                      </p>
                      <p className="text-sm md:text-base text-navy/50 leading-relaxed italic whitespace-normal">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 md:p-8 bg-gradient-to-br from-navy to-navyLight rounded-2xl shadow-luxury">
            <p className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white leading-snug">
              Admissions teams reward <span className="cursive-keyword">clarity</span>.
            </p>
          </div>
        </TextContainer>
      </div>
    </Section>
  )
}
