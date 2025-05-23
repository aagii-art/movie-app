"use client";
import { useState, useEffect } from "react";

const ThemeToggle = ( { isButtonClicked } : { isButtonClicked  : boolean } ) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={` h-[36px] w-[36px] bg-gray-700 dark:bg-white rounded 
                ${ isButtonClicked ? "hidden" : "block" } `}
    >
      {isDarkMode ? " ☀️ " : "🌙"}
    </button>
  );
};
export default ThemeToggle;
