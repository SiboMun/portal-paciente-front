/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'portal-bg': "url('/src/assets/img/entrada-historica-hospital-barros-luco.png')",
      }
    },
  },
  plugins: []
}
