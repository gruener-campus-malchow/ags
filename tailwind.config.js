/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ubuntu', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

