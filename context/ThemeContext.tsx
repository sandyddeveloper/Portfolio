"use client";

import React, { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function subscribeTheme(callback: () => void) {
  const handleCustomChange = () => callback();
  const handleStorage = (e: StorageEvent) => {
    if (e.key === "portfolio-theme") callback();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener("portfolio-theme-change", handleCustomChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("portfolio-theme-change", handleCustomChange);
  };
}

function getThemeSnapshot(): Theme {
  try {
    const stored = localStorage.getItem("portfolio-theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch {
    // Ignore storage errors
  }
  return "dark";
}

function getThemeServerSnapshot(): Theme {
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const currentTheme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);
  const theme: Theme = activeTheme ?? currentTheme;

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("portfolio-theme", nextTheme);
      window.dispatchEvent(new Event("portfolio-theme-change"));
    } catch {
      // Ignore
    }
    setActiveTheme(nextTheme);
  };

  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem("portfolio-theme", newTheme);
      window.dispatchEvent(new Event("portfolio-theme-change"));
    } catch {
      // Ignore
    }
    setActiveTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
