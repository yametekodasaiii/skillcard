/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#006838",
        secondary: "#ffd700",
        accent: "#FFD100",
        gold: "#FFD700",
        silver: "#C0C0C0",
        bronze: "#CD7F32",
        diamond: "#a8e0ec",
      },
      textShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.8)',
        DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.5)',
        lg: '0 8px 16px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'card-entrance': 'cardEntrance 1s ease-out forwards',
        'card-hover': 'cardHover 3s ease-in-out infinite alternate',
        'banner-glow': 'bannerGlow 2s ease-in-out infinite alternate',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite alternate',
        'text-glow': 'textGlow 3s ease-in-out infinite alternate',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'sparkle': 'sparkle 2s infinite',
        'star-twinkle': 'starTwinkle 3s infinite',
        'slide-in-list': 'slideInList 0.5s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out 2s forwards',
        'silver-sparkle': 'silverSparkle 3s infinite',
        'gold-shine': 'goldShine 3s infinite',
        'gold-sparkle': 'goldSparkle 2s infinite',
        'diamond-ultra': 'diamondUltra 2s infinite',
      },
      keyframes: {
        cardEntrance: {
          '0%': { transform: 'translateY(40px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        cardHover: {
          '0%': { transform: 'translateY(0)', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)' },
          '100%': { transform: 'translateY(-10px)', boxShadow: '0 30px 50px rgba(0, 0, 0, 0.3)' },
        },
        bannerGlow: {
          '0%': { boxShadow: '0 0 5px rgba(255,255,255,0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(255,255,255,0.7)' },
        },
        pulseGlow: {
          '0%': { boxShadow: '0 5px 15px rgba(0,0,0,0.3)', transform: 'scale(1)' },
          '100%': { boxShadow: '0 5px 25px rgba(255,215,0,0.6)', transform: 'scale(1.05)' },
        },
        textGlow: {
          '0%': { textShadow: '0 0 5px rgba(0,104,56,0.1)' },
          '100%': { textShadow: '0 0 10px rgba(0,104,56,0.3)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        sparkle: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(185, 242, 255, 0.5)' },
          '50%': { boxShadow: '0 0 15px rgba(185, 242, 255, 0.8)' },
        },
        silverSparkle: {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(192, 192, 192, 0.5)',
            filter: 'brightness(100%)'
          },
          '50%': { 
            boxShadow: '0 0 15px rgba(192, 192, 192, 0.8)',
            filter: 'brightness(120%)'
          },
        },
        goldShine: {
          '0%': { 
            boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
            filter: 'brightness(100%)'
          },
          '25%': { 
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.7)',
            filter: 'brightness(130%)'
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.9)',
            filter: 'brightness(150%)'
          },
          '75%': { 
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.7)',
            filter: 'brightness(130%)'
          },
          '100%': { 
            boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
            filter: 'brightness(100%)'
          },
        },
        goldSparkle: {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
        },
        diamondUltra: {
          '0%': { 
            boxShadow: '0 0 8px rgba(168, 224, 236, 0.4)',
            filter: 'brightness(100%) contrast(90%)'
          },
          '25%': { 
            boxShadow: '0 0 10px rgba(168, 224, 236, 0.5)',
            filter: 'brightness(105%) contrast(95%)'
          },
          '50%': { 
            boxShadow: '0 0 12px rgba(168, 224, 236, 0.6)',
            filter: 'brightness(110%) contrast(100%)'
          },
          '75%': { 
            boxShadow: '0 0 10px rgba(168, 224, 236, 0.5)',
            filter: 'brightness(105%) contrast(95%)'
          },
          '100%': { 
            boxShadow: '0 0 8px rgba(168, 224, 236, 0.4)',
            filter: 'brightness(100%) contrast(90%)'
          },
        },
        starTwinkle: {
          '0%, 100%': { textShadow: '0 0 5px rgba(255, 209, 0, 0.5)' },
          '50%': { textShadow: '0 0 15px rgba(255, 209, 0, 0.8)' },
        },
        slideInList: {
          '0%': { opacity: 0, transform: 'translateX(-20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        awardFlash: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)', backgroundColor: 'rgba(255, 255, 255, 0.8)' },
          '100%': { transform: 'scale(1)' },
        },
        photoPulse: {
          '0%': { transform: 'scale(1)', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' },
          '100%': { transform: 'scale(1.1)', boxShadow: '0 5px 30px rgba(255,215,0,0.8)' },
        },
      }
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {}
      Object.entries(theme('textShadow', {})).forEach(([key, value]) => {
        newUtilities[`.text-shadow${key === 'DEFAULT' ? '' : `-${key}`}`] = {
          'text-shadow': value,
        }
      })
      addUtilities(newUtilities)
    }
  ],
} 