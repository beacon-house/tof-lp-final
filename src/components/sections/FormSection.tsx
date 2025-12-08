import React from 'react'
import { Section } from '../Section'
import { FormContainer } from '../forms/FormContainer'

interface FormSectionProps {
  onClose?: () => void
  currentStep?: string
}

export const FormSection: React.FC<FormSectionProps> = ({ onClose, currentStep }) => {
  const showHelper = currentStep === 'page1'

  return (
    <Section id="form" className="relative py-12 md:py-16 bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="max-w-6xl mx-auto w-full">
        {showHelper && (
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-lg md:text-4xl lg:text-5xl font-serif font-semibold text-navy mb-4">
              Start Your Journey
            </h2>
            <p className="text-base md:text-xl text-navy/70 max-w-2xl mx-auto">
              Share your details and we'll help you navigate the path to your dream university
            </p>
          </div>
        )}

        <FormContainer onClose={onClose} />
      </div>
    </Section>
  )
}
