/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#0D0D0D',
        primaryBlue: '#46D0F2',
        secondaryYellow: '#F7AA00',
        secondaryBlue: '#235784',
        secondaryWhite: '#EEF6F7',
      },
      backgroundImage: {
        'searcher-pc': "url('/src/assets/Desktop/hero.webp')",
        'searcher-tb': "url('/src/assets/Tablet/hero-tablet.webp')",
        'searcher-mb': "url('/src/assets/Movil/hero-movil.webp')",
      },
    },
  },
  plugins: [],
}
