// Section container component with generous padding and max-width
import React from 'react'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'white' | 'lightGray'
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  background = 'white'
}) => {
  const bgColors = {
    white: 'bg-white',
    lightGray: 'bg-lightGray'
  }

  return (
    <section
      id={id}
      className={`${bgColors[background]} py-20 md:py-24 lg:py-28 ${className}`}
    >
      <div className="max-w-content mx-auto px-6 md:px-8 lg:px-12">
        {children}
      </div>
    </section>
  )
}
