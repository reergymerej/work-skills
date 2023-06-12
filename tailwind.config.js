/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    {
      pattern: /(bg|text)-/,
      variants: ['hover'],
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

