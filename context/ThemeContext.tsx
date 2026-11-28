"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

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
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerSmoothTransition = () => {
    const root = document.documentElement;
    root.classList.add("theme-transitioning");
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }
    transitionTimerRef.current = setTimeout(() => {
      root.classList.remove("theme-transitioning");
      transitionTimerRef.current = null;
    }, 460);
  };

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

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

  const applyThemeWithTransition = (nextTheme: Theme) => {
    const commit = () => {
      try {
        localStorage.setItem("portfolio-theme", nextTheme);
        window.dispatchEvent(new Event("portfolio-theme-change"));
      } catch {
        // Ignore
      }
      setActiveTheme(nextTheme);
    };

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => unknown;
    };

    if (typeof doc.startViewTransition === "function") {
      doc.startViewTransition(() => {
        flushSync(() => {
          commit();
          const root = document.documentElement;
          if (nextTheme === "dark") {
            root.classList.add("dark");
            root.classList.remove("light");
            root.setAttribute("data-theme", "dark");
          } else {
            root.classList.add("light");
            root.classList.remove("dark");
            root.setAttribute("data-theme", "light");
          }
        });
      });
    } else {
      triggerSmoothTransition();
      commit();
    }
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    applyThemeWithTransition(nextTheme);
  };

  const setTheme = (newTheme: Theme) => {
    applyThemeWithTransition(newTheme);
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
