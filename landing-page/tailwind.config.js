/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Newsreader"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      colors: {
        canvas: {
          bg: '#FAF9F5',
          card: '#FFFFFF',
          border: '#E8E6DF',
          muted: '#F2F0E8',
          subtle: '#6B6960',
          dark: '#141413',
          navy: '#0B192C',
          accent: '#D4AF37',
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(20, 20, 19, 0.05)',
        'lifted': '0 10px 30px -4px rgba(20, 20, 19, 0.08)',
        'window': '0 25px 50px -12px rgba(20, 20, 19, 0.15)',
      }
    },
  },
  plugins: [],
}

