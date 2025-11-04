import { createContext, useContext, useState, useEffect } from "react";

// Create the Theme Context
const ThemeContext = createContext();

// Context Provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // Optional: persist theme in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for accessing the theme
export function useTheme() {
  return useContext(ThemeContext);
}
