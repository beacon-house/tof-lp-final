// Section G - How We Work section with 5-step timeline process
import React from 'react'
import { Section } from '../Section'

interface ProcessStep {
  number: string
  title: string
  description: string
}

const processSteps: ProcessStep[] = [
  {
    number: '1',
    title: 'Discovery & Clarity',
    description: 'Strengths, interests, potential pathways'
  },
  {
    number: '2',
    title: 'Strategy & Planning',
    description: 'A clear 8–12 multi-year plan + sequencing'
  },
  {
    number: '3',
    title: 'Profile Building',
    description: 'Depth, initiative, impact, aligned to major'
  },
  {
    number: '4',
    title: 'Applications',
    description: 'Essays, recos, interviews, portfolios — one coherent narrative'
  },
  {
    number: '5',
    title: 'Guidance through decisions',
    description: 'Every choice covered'
  }
]

export const ProcessSection: React.FC = () => {
  return (
    <Section id="process" background="navy" className="relative py-12 md:py-16 flex items-center">
      <div className="w-full max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="font-serif text-lg md:text-4xl text-white mb-10 md:mb-14 leading-tight text-center font-semibold">
          How We Work
        </h2>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden relative pl-16 pr-4 mb-10">
          {processSteps.map((step, index) => (
            <div key={step.number} className="relative mb-8 last:mb-0">
              {/* Vertical Line */}
              {index < processSteps.length - 1 && (
                <div className="absolute left-[-48px] top-10 w-[2px] h-full bg-gradient-to-b from-gold to-goldLight" />
              )}

              {/* Circle */}
              <div className="absolute left-[-68px] top-0 w-10 h-10 rounded-full bg-gradient-to-br from-gold to-goldLight flex items-center justify-center shadow-lg">
                <span className="text-lg font-bold text-navy">{step.number}</span>
              </div>

              {/* Content */}
              <div className="ml-2">
                <h3 className="text-base font-medium text-white mb-1.5 leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block relative mb-12">
          <div className="flex justify-between items-start relative">
            {/* Horizontal Line */}
            <div className="absolute top-7 left-8 right-8 h-1 bg-gradient-to-r from-gold via-gold to-goldLight" />

            {processSteps.map((step) => (
              <div key={step.number} className="relative flex flex-col items-center" style={{ width: '18%' }}>
                {/* Circle */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-gold to-goldLight flex items-center justify-center shadow-lg mb-6">
                  <span className="text-xl font-bold text-navy">{step.number}</span>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-base font-bold text-white mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-snug">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
