// src/components/ThemeToggle.tsx
import React from "react";
import { useTheme } from "@/context/ThemeContext"; 
import { Sun, Moon } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {/* Icon */}
      {theme === "light" ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-200" />
      )}

      {/* Toggle Switch */}
      <div
        className="relative w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer"
        onClick={toggleTheme}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ease-in-out ${
            theme === "dark" ? "translate-x-5" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default ThemeToggle;
