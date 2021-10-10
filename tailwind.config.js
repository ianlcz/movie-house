module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      margin: {
        84: "22rem",
      },
    },
  },
  variants: {
    extend: {
      ringColor: ["responsive", "dark", "focus-within", "focus"],
      ringOffsetColor: ["responsive", "dark", "focus-within", "focus"],
      ringOffsetWidth: ["responsive", "focus-within", "focus"],
      ringOpacity: ["responsive", "dark", "focus-within", "focus"],
      ringWidth: ["responsive", "focus-within", "focus"],
      margin: ["first", "last"],
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
