// Section B - The Real Pain Point section
import { forwardRef } from 'react'
import { Section } from '../Section'
import { TextContainer } from '../TextContainer'

export const PainPointSection = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <Section ref={ref} id="pain-point" className="relative md:min-h-screen flex items-center bg-white">
      <div className="grid lg:grid-cols-2 gap-4 md:gap-8 lg:gap-16 items-center w-full">
        <TextContainer>


          <p className="font-serif text-lg md:text-2xl lg:text-3xl text-navy mb-6 md:mb-8 leading-tight font-medium">
            If this feels familiar, you're not alone:
          </p>

          {/* Vertical list on all screen sizes */}
          <div className="w-full mb-4 md:mb-8">
            <ul className="flex flex-col gap-3 md:gap-4 w-full">
              {[
                'Unsure what your child\'s long-term path should be',
                'Many activities, but not sure which ones matter',
                'Unsure what\'s important across Grades 8–12',
                'Confusion about when to focus on what',
                'Conflicting advice from school, tutors and peers'
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start group hover:translate-x-2 transition-transform duration-300 bg-white/50 md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none border border-gold/10 md:border-none"
                >
                  <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold/10 flex items-center justify-center mr-4 mt-0.5 group-hover:bg-gold/20 transition-colors duration-300">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm md:text-base lg:text-lg text-navy/80 leading-[1.6] font-medium pt-1">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 md:p-6 bg-gradient-to-br from-gray50 to-white rounded-2xl border border-gold/10 shadow-luxury mt-4 md:mt-8">
            <p className="text-base md:text-xl lg:text-2xl font-serif text-navy leading-tight md:leading-snug">
              <span className="block md:inline font-medium">
                This isn't a <span className="font-bold text-navy">marks</span> problem.
              </span>
              <br className="md:hidden" />
              <span className="block md:inline font-bold">
                This is a <span className="cursive-keyword">clarity</span> problem.
              </span>
            </p>
          </div>
        </TextContainer>

        <div className="relative lg:order-last order-first h-[300px] md:h-[400px] lg:h-[500px] hidden md:block">
          {/* Decorative background elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-gold/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-navy/5 rounded-full blur-3xl"></div>

          {/* Image container with enhanced styling */}
          <div className="relative h-full rounded-3xl overflow-hidden shadow-luxury group">
            <img
              src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop"
              alt="Parent contemplating education choices"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </Section>
  )
})
