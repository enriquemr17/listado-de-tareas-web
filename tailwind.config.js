/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./**/*.js"],
  safelist: [
  {
    pattern: /bg-(red|blue|green|yellow|orange)-(400|500|600|700)/
  }
],
  darkMode: "class",
  theme: {
    extend: {}
    
  },
  plugins: [],
}