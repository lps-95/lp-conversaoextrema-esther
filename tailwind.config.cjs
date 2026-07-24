module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Breakpoint extra para telas de celular pequenas/médias (ex: iPhone
      // SE é ~375px, a maioria dos Android fica entre 360-412px). Sem isso,
      // tudo abaixo de 640px (sm) cai no mesmo estilo "base", sem diferenciar
      // aparelho bem pequeno de aparelho médio.
      screens: {
        xs: '400px',
      },
      // Espaçamentos que respeitam a "área segura" de aparelhos com notch/
      // ilha dinâmica/barra de gestos (iPhone principalmente). Uso:
      // pb-safe-bottom, pt-safe-top, etc.
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
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
