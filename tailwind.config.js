/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#003366',
        navyLight: '#004080',
        navyDark: '#002244',
        yellow: '#ffc736',
        yellowLight: '#ffd45c',
        yellowDark: '#ffb300',
        gray50: '#f9fafb',
        gray100: '#f3f4f6',
        gray200: '#e5e7eb',
        customGray: '#dae0e7',
        gold: '#ffc736',
        goldLight: '#ffd45c',
        cream: '#ffffff',
        sage: '#f9fafb',
        lightGray: '#f3f4f6',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        cursive: ['Caveat', 'cursive'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        'content': '1320px',
        'text': '900px',
      },
      backgroundSize: {
        '200': '200%',
      },
      backgroundPosition: {
        '0': '0%',
        '100': '100%',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fade-in-up-delay': 'fadeInUp 1s ease-out 0.2s forwards',
        'fade-in-up-delay-2': 'fadeInUp 1s ease-out 0.4s forwards',
        'fade-in-up-delay-3': 'fadeInUp 1s ease-out 0.6s forwards',
        'scale-in': 'scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'slide-in-left': 'slideInLeft 1s ease-out forwards',
        'slide-in-right': 'slideInRight 1s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'draw-line': 'drawLine 1.5s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 199, 54, 0.4), 0 0 40px rgba(255, 199, 54, 0.1)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 199, 54, 0.6), 0 0 60px rgba(255, 199, 54, 0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}
