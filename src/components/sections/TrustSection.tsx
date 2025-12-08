// Section H - Trust + Proof section
import React from 'react'
import { Section } from '../Section'
import { Button } from '../Button'

interface TrustSectionProps {
  onShowForm: () => void
}

export const TrustSection: React.FC<TrustSectionProps> = ({ onShowForm }) => {
  const handleBookCall = () => {
    onShowForm()
  }

  const handleRequestEvaluation = () => {
    onShowForm()
  }

  return (
    <Section id="trust" className="relative py-16 md:py-20 flex items-center bg-gradient-to-br from-white via-gray50 to-white">
      <div className="max-w-5xl mx-auto w-full">
        {/* Three Opening Lines */}
        <div className="text-center mb-8 md:mb-10 space-y-4 md:space-y-5">
          <p className="font-serif text-lg md:text-3xl lg:text-4xl text-navy leading-tight font-bold">
            Admissions doesn't have to feel chaotic.
          </p>
          <p className="font-serif text-lg md:text-3xl lg:text-4xl text-navy leading-tight font-bold">
            Clarity is possible.
          </p>
          <p className="font-serif text-lg md:text-3xl lg:text-4xl text-navy leading-tight font-bold">
            And it changes <span className="cursive-keyword">everything</span>.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 md:mt-10">
          <Button variant="primary" onClick={handleBookCall} className="w-full sm:w-auto sm:min-w-[280px]">
            Book a Founder Strategy Call
          </Button>
          <Button variant="secondary" onClick={handleRequestEvaluation} className="w-full sm:w-auto sm:min-w-[280px]">
            Request an Evaluation
          </Button>
        </div>
      </div>
    </Section>
  )
}
