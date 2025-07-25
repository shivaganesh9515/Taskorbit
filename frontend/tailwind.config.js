/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/**/*.scss"
  ],
  theme: {
    extend: {
      // Extend with your Taskorbit theme colors
      colors: {
        'taskorbit': {
          'primary-bg': '#EDF8FC',
          'sidebar-bg': '#2C2E2F',
          'glass-white': 'rgba(255, 255, 255, 0.8)',
          'glass-border': 'rgba(255, 255, 255, 0.2)',
          'accent-primary': '#4f46e5',
          'accent-secondary': '#7c3aed',
          'text-primary': '#1f2937',
          'text-secondary': '#6b7280',
        }
      },
      backdropBlur: {
        'glass': '12px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 12px 40px rgba(0, 0, 0, 0.15)',
        'glass-xl': '0 20px 60px rgba(0, 0, 0, 0.2)',
      },
      borderRadius: {
        'glass': '16px',
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '70': '17.5rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class', // Enable dark mode with class strategy
}