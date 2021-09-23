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
      inter: ["Inter"],
      monoton: ["Monoton"],
    },
    screens: {
      xs: "250px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1536px",
    },
    minHeight: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
      270: "270px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
