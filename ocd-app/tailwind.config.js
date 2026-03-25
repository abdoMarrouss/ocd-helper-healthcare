/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary:    '#4F7CAC',
        secondary:  '#6BAE8E',
        background: '#F8F7F4',
        surface:    '#FFFFFF',
        muted:      '#8A8A8A',
        danger:     '#E05C5C',
      },
      fontFamily: {
        arabic: ['Tajawal', 'sans-serif'],
        latin:  ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
