/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'municipality': {
          primary: '#2563eb',
          secondary: '#10b981',
          accent: '#f59e0b',
        },
        'card': {
          persona: '#3b82f6',
          problem: '#ef4444',
          partner: '#10b981',
          job: '#f59e0b',
        }
      }
    },
  },
  plugins: [],
}
