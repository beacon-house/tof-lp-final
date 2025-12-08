// Section E - What Makes Us Different section
import React from 'react'
import { Section } from '../Section'
import { TextContainer } from '../TextContainer'

const differentiators = [
  {
    title: 'Former Admissions Officers',
    description: 'Experts who know how applications are evaluated',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
      </svg>
    )
  },
  {
    title: 'Graduate Coaches from top global schools',
    description: 'Mentors who help shape direction, depth, and narrative',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
    )
  },
  {
    title: 'India-context guidance',
    description: 'Teams who understand school realities & pressures',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    title: 'World-class opportunities',
    description: 'Research mentorship, signature projects, internships',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    )
  }
]

export const WhoWeAreSection: React.FC = () => {
  return (
    <Section id="about" className="relative py-14 md:py-16 flex items-center bg-white">
      <div className="w-full max-w-4xl mx-auto">
        <TextContainer>
          <h2 className="font-serif text-lg md:text-2xl lg:text-3xl text-navy mb-4 md:mb-6 leading-tight font-bold">
            Through our partnership with <span className="font-bold text-navy bg-gold/10 px-2 py-0.5 rounded">InGenius Prep</span>, we bring:
          </h2>

          {/* Vertical list on all screen sizes */}
          <div className="w-full mb-5 md:mb-6">
            <div className="flex flex-col gap-3 md:gap-4 w-full">
              {differentiators.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start p-3 md:p-4 bg-white rounded-2xl border border-navy/5 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-x-2"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-gold to-goldLight flex items-center justify-center mr-3 text-white group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-bold text-navy text-base leading-snug mb-1">
                      {item.title}
                    </p>
                    <p className="text-xs md:text-sm text-navy/60 leading-[1.6]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 md:p-6 bg-gradient-to-br from-gray50 to-white rounded-2xl border border-gold/10 shadow-sm">
            <p className="font-serif text-base md:text-xl lg:text-2xl text-navy leading-snug font-medium">
              Every student's path is different — <span className="cursive-keyword">so the support must be too</span>.
            </p>
          </div>
        </TextContainer>
      </div>
    </Section>
  )
}
