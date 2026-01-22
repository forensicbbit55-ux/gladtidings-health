/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,mdx}',
    './src/components/**/*.{js,jsx,mdx}',
    './src/app/**/*.{js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B4332',
        secondary: '#2D6A4F',
        accent: '#D4A373',
      },
    },
  },
  plugins: [],
}
