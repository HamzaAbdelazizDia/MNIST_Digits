/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0e27',
          card: '#14192f',
        },
        fire: {
          red: '#ff0000',
          orange: '#ff6b35',
          gold: '#ffd700',
        },
        rocket: {
          purple: '#667eea',
          violet: '#764ba2',
        }
      },
      backgroundImage: {
        'fire-gradient': 'linear-gradient(180deg, #ff0000 0%, #ff6b00 30%, #ffa500 60%, #ffd700 100%)',
        'primary-gradient': 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ffd700 100%)',
        'secondary-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'flicker': 'flicker 1.5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'bounce-in': 'bounce-in 0.5s ease',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-5deg)' },
          '50%': { transform: 'translateY(-10px) rotate(5deg)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.1)' },
        },
        'pulse-glow': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'bounce-in': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
