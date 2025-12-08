// Section C - What Actually Matters Now section
import React from 'react'
import { Section } from '../Section'
import { TextContainer } from '../TextContainer'

export const AuthoritySection: React.FC = () => {
  return (
    <Section id="authority" className="relative md:min-h-screen flex items-center bg-white">
      <div className="grid lg:grid-cols-2 gap-4 md:gap-8 lg:gap-16 items-center w-full">
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] order-2 lg:order-1 hidden md:block">
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


          <p className="font-serif text-lg md:text-2xl lg:text-3xl text-navy mb-6 md:mb-8 leading-tight font-medium mt-8 md:mt-0">
            Admissions teams of top colleges look for
          </p>

          {/* Vertical list on all screen sizes */}
          <div className="w-full mb-4 md:mb-8">
            <ul className="flex flex-col gap-3 md:gap-4 w-full">
              {[
                { main: 'Real strengths', sub: 'not long activity lists' },
                { main: 'Direction that connects interests', sub: 'not scattered interests' },
                { main: 'Depth and initiative', sub: 'not checkbox achievements' },
                { main: 'Consistent growth across Grades 8–12', sub: 'not last-minute scrambling' }
              ].map((item, index) => (
                <li
                  key={index}
                  className="group hover:translate-x-2 transition-transform duration-300"
                >
                  <div className="flex items-start p-3 md:p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-navy/5 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-gold to-goldLight flex items-center justify-center mr-4 mt-0.5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm md:text-base lg:text-lg text-navy font-semibold leading-snug mb-1">
                        {item.main}
                      </p>
                      <p className="text-xs md:text-sm text-navy/50 leading-[1.6] italic">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 md:p-6 bg-gradient-to-br from-gray50 to-white rounded-2xl border border-gold/10 shadow-luxury mt-4 md:mt-8">
            <p className="text-base md:text-xl lg:text-2xl font-serif font-bold text-navy leading-tight md:leading-snug">
              <span className="block md:inline">
                <span className="cursive-keyword">Clarity</span> is not a good-to-have.
              </span>
              <br className="md:hidden" />
              <span className="block md:inline"> Its a must-have.</span>
            </p>
          </div>
        </TextContainer>
      </div>
    </Section>
  )
}
