// Section container component with generous padding and max-width
import React from 'react'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'white' | 'lightGray' | 'navy'
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  background = 'white'
}) => {
  const bgColors = {
    white: 'bg-white',
    lightGray: 'bg-lightGray',
    navy: 'bg-navy'
  }

  return (
    <section
      id={id}
      className={`${bgColors[background]} py-6 md:py-20 lg:py-24 ${className} relative overflow-hidden`}
    >
      {/* Soft gradient fade at top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-12 md:h-20 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, transparent 100%)'
        }}
      ></div>

      {/* Soft gradient fade at bottom edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 md:h-20 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to top, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, transparent 100%)'
        }}
      ></div>

      <div className="max-w-content mx-auto px-6 md:px-8 lg:px-12 relative z-20">
        {children}
      </div>
    </section>
  )
}
