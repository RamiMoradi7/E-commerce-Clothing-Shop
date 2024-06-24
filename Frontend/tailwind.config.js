// tailwind.config.js
const { default: theme, content } = require("@material-tailwind/react/theme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        '78': '19rem',
        '22': '4.8rem'
      },
      rotate: {
        '80': '80deg',
      },
      height: {
        '13': '3.25rem',
      },
      screens: {
        'xs': '540px',
        'xxs': '300px',
      },
    },
  },
  plugins: [],
};
