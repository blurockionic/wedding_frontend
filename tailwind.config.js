/** @type {import('tailwindcss').Config} */ 
const flowbite = require("flowbite-react/tailwind");
    const plugin = require ("tailwindcss/plugin");
// Utility to create RGBA colors

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      borderRadius: {
        DEFAULT: "0.5rem", 
      },
      fontFamily: {
        outfit: ["outfit", "sans-serif"],
        montserrat: ["montserrat", "sans-serif"],
        pd: ["pd", "serif"],
      },
      boxShadow: {
        custom: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      },
      keyframes: {
        "smooth-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "100%": { opacity: 0, visibility: "hidden" },
        },
      },
      animation: {
        "smooth-scroll": "smooth-scroll 20s linear infinite",
        "fade-in": "fadeIn 1.5s ease-in-out",
        "fade-out": "fadeOut 1s ease-out 1.5s forwards",
      },
      
    },
  },
  plugins: [
    require("flowbite/plugin")({
      charts: true,
    }),
    // require('@tailwindcss/typography'),
    plugin(function ({ addUtilities, theme, e }) {
      const colors = theme("colors");
      const newUtilities = {};

      Object.keys(colors).forEach((color) => {
        if (typeof colors[color] === "object") {
          Object.keys(colors[color]).forEach((shade) => {
            const baseColor = colors[color][shade];

            for (let i = 1; i <= 10; i++) {
              const opacity = i * 0.1;
              const className = e(`bg-${color}-${shade}-${Math.round(opacity * 100)}`);
              newUtilities[className] = { backgroundColor: `rgba(${baseColor}, ${opacity})` };
            }
          });
        }
      });

      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};