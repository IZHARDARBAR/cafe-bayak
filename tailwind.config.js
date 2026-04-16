/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A96E',
          light: '#E8D5B0',
          dark: '#8B6E3A',
        },
        cream: {
          DEFAULT: '#F9F4EC',
          dark: '#EDE5D4',
        },
        brown: {
          DEFAULT: '#2C1E0F',
          mid: '#5C3D1E',
          light: '#8B6347',
        },
        site: {
          white: '#FEFCF8',
          muted: '#9C8670',
          forest: '#2D3B2A',
          dark: '#1a0e05',
        },
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        jost: ['Jost', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
        widest3: '0.45em',
      },
      animation: {
        'hero-zoom': 'heroZoom 20s ease-in-out infinite alternate',
        'fade-up': 'fadeUp 1.2s ease 0.3s both',
        'bounce-slow': 'bounceSlow 2s ease-in-out infinite',
      },
      keyframes: {
        heroZoom: {
          from: { transform: 'scale(1)' },
          to:   { transform: 'scale(1.05)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
          '50%':       { transform: 'translateX(-50%) translateY(6px)' },
        },
      },
    },
  },
  plugins: [],
}
