/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ember:    '#8C1E00',
        terra:    '#B43C1E',
        peach:    '#F2A57B',
        blush:    '#F0D2B4',
        cream:    '#FAF6EE',
        forest:   '#5A3C00',
        ink:      '#3C1E00',
        inkl:     '#783C1E',
        inkll:    '#D2B496',
        gold:     '#D2961E',
        olive:    '#96963C',
        parchment:'#F0F0D2',
        slate:    '#464F5F',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
