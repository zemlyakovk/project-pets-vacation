module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/*.{html,js}", "./node_modules/tw-elements/dist/js/**/*.js"],
  theme: {
    extend: {
      fontFamily:{
        'amatic': 'Amatic SC',
        'Oranienbaum': 'Oranienbaum'
      }
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
