const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Generator", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        "body::-webkit-scrollbar": {
          display: "none",
        },
      });
    }),
  ],
};
