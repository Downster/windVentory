/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        teal: colors.teal,
        cyan: colors.cyan,
      },
      height: {
        '80': '20.25rem',
        '100': '40.25rem',
        'most': '98%'
      },
      width: {
        '80': '20.25rem',
        '100': '40.25rem',
      }
    },
    plugins: [],
  }
}
