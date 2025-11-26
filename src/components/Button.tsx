// Reusable button components following exact brand guidelines
import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
  type?: 'button' | 'submit'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button'
}) => {
  const baseStyles = 'h-12 px-8 rounded-lg font-semibold text-base transition-all duration-200 ease-in-out'

  const variants = {
    primary: 'bg-gold text-navy hover:bg-gold/90 hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-white text-navy border-2 border-navy hover:bg-navy hover:text-white'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
