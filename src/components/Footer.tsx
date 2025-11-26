// Premium footer with gold accents and enhanced styling
import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-navy text-white">
      <div className="max-w-content mx-auto px-6 py-6">
        <div className="flex justify-center">
          <img
            src="/bh-ig-logo.png"
            alt="Beacon House"
            className="h-8 w-auto opacity-80"
          />
        </div>
      </div>
    </footer>
  )
}
