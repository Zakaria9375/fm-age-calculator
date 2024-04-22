/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      purple: "#854DFF",
      red: "#FF5959",
      black: "#151515",
      white: "#FFFFFF",
      grey: "#716F6F",
      gray: "#F0F0F0",
      line: "#DCDCDC"
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

