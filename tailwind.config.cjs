module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000000',
          dark: '#0a0a0a',
          light: '#1a1a1a',
        },
        accent: {
          brown: '#6b5344',
          cream: '#e8dcc8',
          gold: '#d4af37',
          silver: '#c0c0c0',
        },
        text: {
          primary: '#ffffff',
          secondary: '#e8e8e8',
          tertiary: '#a8a8a8',
          muted: '#6a6a6a',
        },
        button: {
          primary: '#e8dcc8',
          primaryHover: '#f5e6d3',
          secondary: '#6b5344',
          secondaryHover: '#8b7355',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
