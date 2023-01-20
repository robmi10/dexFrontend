/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fade: "fade 0.5s ease-in",
        fadeAfter: "fadeInAfter 0.8s ",
        drop: "dropLetter 1s",
        dropSecond: "dropLetter 1.2s ",
        dropThird: "dropLetter 2s ",
      },
      keyframes: (theme) => ({
        fade: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },

        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        fadeInAfter: {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        dropLetter: {
          "0%": {
            opacity: "0",
            transform: "translateY(-200px)",
          },
          "5%": {
            opacity: ".7",
          },
          "50%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
          "65%": {
            opacity: "1",
            transform: "translateY(-17px)",
          },
          "75%": {
            opacity: "1",
            transform: "translateY(-22px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
        },
      }),
    },
  },
  plugins: [],
};
