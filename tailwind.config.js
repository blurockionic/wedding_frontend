/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        dustyRose: {
          DEFAULT: "var(--color-dusty-rose)",
          light: "var(--color-dusty-rose-light)",
          dark: "var(--color-dusty-rose-dark)",
        },
        sageGreen: {
          DEFAULT: "var(--color-sage-green)",
          light: "var(--color-sage-green-light)",
          dark: "var(--color-sage-green-dark)",
        },
        champagne: {
          DEFAULT: "var(--color-champagne)",
          light: "var(--color-champagne-light)",
          dark: "var(--color-champagne-dark)",
        },
        ivory: {
          DEFAULT: "var(--color-ivory)",
          light: "var(--color-ivory-light)",
          dark: "var(--color-ivory-dark)",
        },
        blushPink: {
          DEFAULT: "var(--color-blush-pink)",
          light: "var(--color-blush-pink-light)",
          dark: "var(--color-blush-pink-dark)",
        },
      },
    },
  },

};
