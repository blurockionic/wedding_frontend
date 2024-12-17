import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Import icons from react-icons

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center px-4 py-1 bg-dustyRose text-ivory rounded shadow-md hover:bg-dustyRose-dark focus:outline-none"
    >
      {theme === "light" ? <FaMoon className="text-lg" /> : <FaSun className="text-lg" />}
      
    </button>
  );
}
