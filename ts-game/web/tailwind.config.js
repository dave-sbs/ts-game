/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ts-blue': '#3178c6',
        'ts-dark': '#1e293b',
        'quest-gold': '#fbbf24',
        'quest-green': '#10b981',
        'quest-purple': '#8b5cf6',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          'from': { boxShadow: '0 0 10px #3178c6, 0 0 20px #3178c6' },
          'to': { boxShadow: '0 0 20px #3178c6, 0 0 40px #3178c6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
