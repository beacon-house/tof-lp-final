
```yaml
# Beacon House - TOF Landing Page Brand System
# Version: 1.0
# For LLM/AI consumption. Based on implemented code.

# 1. Color Palette
# Defines the core color tokens used in the UI.
colors:
  # Primary brand colors
  navy: '#001F3F'
  navyLight: '#003366' # Used for gradients and lighter navy elements
  gold: '#F59E0B'
  goldLight: '#FCD34D' # Used for gradients

  # Neutral & Background colors
  cream: '#FFFBF5' # Primary background color
  sage: '#F8FAF6' # Used in background gradients
  charcoal: '#1A1A1A' # Base text color
  lightGray: '#F5F5F5'
  white: '#FFFFFF'

# 2. Typography System
# Defines font families, sizes, and styles.
typography:
  # Font Families
  # - sans: For all body and UI text.
  # - serif: For main headlines to create an editorial feel.
  # - cursive: For highlighted, handwritten-style keywords.
  fontFamily:
    sans: '"Plus Jakarta Sans", system-ui, sans-serif'
    serif: 'Fraunces, Georgia, serif'
    cursive: 'Caveat, cursive'

  # Font Weights
  # Mapped from Tailwind classes (e.g., font-light, font-normal, etc.)
  weights:
    light: 300
    normal: 400
    medium: 500
    semibold: 600
    bold: 700
    extrabold: 800

  # Core Text Styles
  # Defines styles for base elements.
  styles:
    body:
      font: 'sans'
      color: 'charcoal'
      size: '16px' # Base size, can vary
    h1:
      font: 'serif'
      color: 'navy'
      weight: 'bold'
      size: 'Starts at 2.5rem, up to 7xl (96px)'
    h2:
      font: 'serif'
      color: 'navy'
      weight: 'bold'
      size: 'Typically 4xl to 5xl' # Inferred
    p:
      font: 'sans'
      color: 'navy/70' # Muted navy
      weight: 'light'
      size: 'lg (18px) to 2xl (24px)'

# 3. Core Components
# Describes the styling for key reusable UI components.
components:
  # Buttons
  # All buttons use the 'sans' font.
  button:
    base:
      height: '48px' # h-12
      padding: '0 32px' # px-8
      borderRadius: '8px' # rounded-lg
      fontWeight: 'semibold'
      fontSize: '16px' # text-base
    variants:
      primary:
        background: 'gold'
        color: 'navy'
        hover:
          background: 'gold/90'
          transform: 'translateY(-0.5px)'
          boxShadow: 'lg'
      secondary:
        background: 'white'
        color: 'navy'
        border: '2px solid'
        borderColor: 'navy'
        hover:
          background: 'navy'
          color: 'white'

  # StatPill
  # A small pill-shaped element for highlighting a key stat.
  statPill:
    background: 'white'
    border: '1px solid rgba(0, 31, 63, 0.1)' # navy at 10% opacity
    borderRadius: 'full'
    padding: '8px 16px'
    display: 'flex'
    alignItems: 'center'
    gap: '8px'
    font: 'sans'
    fontWeight: 'semibold'
    fontSize: '14px'
    color: 'navy'

# 4. Layout & Spacing
# Defines container sizes and spacing rules.
layout:
  container:
    maxWidth: '1320px' # max-w-content
  textContainer:
    maxWidth: '900px' # max-w-text
  sectionPadding:
    vertical: '80px to 100px' # Inferred from design doc, consistent with code
    horizontal: '24px to 48px' # px-6 to px-12

# 5. Special Effects & Utilities
# Custom, high-impact visual effects.
effects:
  # Cursive Keyword
  # A special class for highlighting words with a cursive font and gradient.
  cursive-keyword:
    font: 'cursive'
    fontWeight: '700'
    fontSize: '1.6em' # Relative to parent
    background: 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)'
    textFillColor: 'transparent'
    textShadow: '0 2px 20px rgba(245, 158, 11, 0.3)'

  # Gradient Text
  # Applies a navy gradient to text.
  gradient-text:
    background: 'linear-gradient(135deg, #001F3F 0%, #003366 100%)'
    textFillColor: 'transparent'

  # Shadow Styles
  # Custom shadows for a premium feel.
  shadows:
    shadow-luxury: '0 20px 60px -15px rgba(0, 31, 63, 0.2), 0 10px 30px -10px rgba(245, 158, 11, 0.15)'
    shadow-glow: '0 10px 40px -10px rgba(245, 158, 11, 0.4), 0 0 20px rgba(245, 158, 11, 0.2)'

  # Animations
  # Keyframe animations for scroll-triggered events.
  animations:
    fade-in-up:
      opacity: '0 -> 1'
      transform: 'translateY(40px) -> translateY(0)'
      duration: '1s'
      easing: 'ease-out'
```
