// Section D - What We Help Families Do section
import React from 'react'
import { Section } from '../Section'

interface BridgeSectionProps {
  onUnderstandApproach?: () => void
}

const benefits = [
  {
    title: 'What actually matters vs what\'s noise',
    description: 'So you stop guessing.',
    icon: '/icons/frame_2.png'
  },
  {
    title: 'What to do in each grade (8–12)',
    description: 'Know exactly what matters each year — with no confusion.',
    icon: '/icons/frame_3.png'
  },
  {
    title: 'How interests become real pathways',
    description: 'From "they like many things" → "this direction makes sense."',
    icon: '/icons/frame_4.png'
  },
  {
    title: 'How admissions teams think at every stage',
    description: 'So your child\'s choices align with what colleges actually value.',
    icon: '/icons/frame_5.png'
  },
  {
    title: 'What to ignore completely',
    description: 'So your child isn\'t pulled into unnecessary pressure.',
    icon: '/icons/frame_6.png'
  },
  {
    title: 'How to build direction with busy schedules',
    description: 'Sports, school load, multiple interests — balanced.',
    icon: '/icons/frame_7.png'
  },
  {
    title: 'How strengths turn into depth + impact',
    description: 'The base of a strong college story.',
    icon: '/icons/frame_8.png'
  }
]

export const BridgeSection: React.FC<BridgeSectionProps> = ({ onUnderstandApproach }) => {
  return (
    <Section id="bridge" className="relative py-10 md:py-12 flex items-center bg-white">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-5 md:mb-7 max-w-3xl mx-auto">


          <h2 className="font-serif text-lg md:text-2xl lg:text-3xl text-navy mb-4 leading-tight font-bold">
            Here's how we help families build that clarity
          </h2>

          <div className="h-1 w-24 bg-gradient-to-r from-gold to-goldLight rounded-full mx-auto"></div>
        </div>

        {/* Benefits Grid - All screen sizes */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-3 md:gap-4 mb-8 md:mb-10">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-3 md:p-5 bg-white rounded-2xl border border-gray-200 shadow-sm md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-5 h-5 md:w-8 md:h-8 mb-3 md:mb-3">
                <img
                  src={benefit.icon}
                  alt={benefit.title}
                  className="w-full h-full object-contain"
                  style={{ imageRendering: 'crisp-edges' }}
                />
              </div>
              <h3 className="text-xs font-semibold text-navy mb-1 md:mb-2 leading-snug">
                {benefit.title}
              </h3>
              <p className="text-[10px] md:text-sm text-navy/70 leading-relaxed md:mt-auto">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            className="inline-block h-12 md:h-14 px-8 md:px-10 rounded-lg font-semibold text-base md:text-lg bg-gradient-to-r from-gold to-goldLight text-navy shadow-sm hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 ease-in-out leading-[3rem] md:leading-[3.5rem]"
            onClick={onUnderstandApproach}
          >
            Understand Our Approach
          </button>
        </div>
      </div>
    </Section>
  )
}
