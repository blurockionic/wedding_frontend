/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

// Utility to create RGBA colors
const rgbaColor = (color, opacity) => {
  // Extract RGB components from the color, assuming color is in hex or rgb format
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const rgb = hexToRgb(color);
  return `${rgb}, ${opacity}`;
};

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
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
  plugins: [
    require("flowbite/plugin")({
      charts: true,
    }),
    plugin(function ({ addUtilities, theme, e }) {
      const colors = theme("colors");
      const newUtilities = {};

      Object.keys(colors).forEach((color) => {
        if (typeof colors[color] === "object") {
          Object.keys(colors[color]).forEach((shade) => {
            const baseColor = colors[color][shade];

            // Generate opacity levels (0.1, 0.2, 0.3, ..., 1)
            for (let i = 1; i <= 10; i++) {
              const opacity = i * 0.1;
              const rgbaValue = rgbaColor(baseColor, opacity);
              const className = e(
                `bg-${color}-${shade}-${Math.round(opacity * 100)}`
              );

              // Adding bg utility for background color with opacity
              newUtilities[className] = {
                backgroundColor: `rgba(${rgbaValue})`,
              };
            }
          });
        }
      });

      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
