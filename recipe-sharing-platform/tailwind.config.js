/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'recipe-primary': '#f97316',
        'recipe-secondary': '#ea580c',
        'recipe-accent': '#fb923c',
      },
    },
  },
  plugins: [],
}