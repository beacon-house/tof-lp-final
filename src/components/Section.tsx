// Section container component with generous padding and max-width
import { forwardRef } from 'react'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'white' | 'lightGray' | 'navy'
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(({
  children,
  className = '',
  id,
  background = 'white'
}, ref) => {
  const bgColors = {
    white: 'bg-white',
    lightGray: 'bg-lightGray',
    navy: 'bg-navy'
  }

  return (
    <section
      ref={ref}
      id={id}
      className={`${bgColors[background]} py-6 md:py-20 lg:py-24 ${className}`}
    >
      <div className="max-w-content mx-auto px-6 md:px-8 lg:px-12">
        {children}
      </div>
    </section>
  )
})
