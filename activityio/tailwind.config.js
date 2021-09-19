module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        dashboardlayout: "3rem 1fr",
      },
    },
    fontFamily: {
      montserrat: ["Montserrat"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
