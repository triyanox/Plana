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
    animation: {
      "gradient-x": "gradient-x 3s ease infinite",
      "gradient-y": "gradient-y 3s ease infinite",
      "gradient-xy": "gradient-xy 3s ease infinite",
    },
    keyframes: {
      "gradient-y": {
        "0%, 100%": {
          "background-size": "400% 400%",
          "background-position": "center top",
        },
        "50%": {
          "background-size": "200% 200%",
          "background-position": "center center",
        },
      },
      "gradient-x": {
        "0%, 100%": {
          "background-size": "200% 200%",
          "background-position": "left center",
        },
        "50%": {
          "background-size": "200% 200%",
          "background-position": "right center",
        },
      },
      "gradient-xy": {
        "0%, 100%": {
          "background-size": "400% 400%",
          "background-position": "left center",
        },
        "50%": {
          "background-size": "200% 200%",
          "background-position": "right center",
        },
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
