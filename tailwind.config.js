/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-blue': '#0f172a',
        'space-purple': '#1e1b4b',
        'tech-cyan': '#06b6d4',
        'tech-blue': '#3b82f6',
        'tech-purple': '#8b5cf6',
        'accent-orange': '#f97316',
      },
      animation: {
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg) translateX(30px) rotate(0deg)' },
          to: { transform: 'rotate(360deg) translateX(30px) rotate(-360deg)' },
        }
      },
      fontFamily: {
        'tech': ['Monaco', 'Menlo', 'Ubuntu Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}