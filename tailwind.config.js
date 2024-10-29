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
    },
  },
  plugins: [],
}
