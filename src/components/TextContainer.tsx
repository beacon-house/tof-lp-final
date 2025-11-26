// Text container with optimal reading width (700px max)
import React from 'react'

interface TextContainerProps {
  children: React.ReactNode
  className?: string
  center?: boolean
}

export const TextContainer: React.FC<TextContainerProps> = ({
  children,
  className = '',
  center = false
}) => {
  return (
    <div className={`max-w-text ${center ? 'mx-auto' : ''} ${className}`}>
      {children}
    </div>
  )
}
