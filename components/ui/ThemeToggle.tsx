"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/lib/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export function ThemeToggle({
  className = "",
  showLabel = false,
  size = "md",
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-2xl bg-slate-100 dark:bg-slate-800 ${className}`}
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Night Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Night Mode"}
      className={`relative inline-flex items-center gap-2 rounded-2xl transition-all duration-200 border ${
        isDark
          ? "bg-slate-800/90 hover:bg-slate-700 text-amber-300 border-slate-700/80 shadow-inner"
          : "bg-white/90 hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs"
      } ${
        size === "sm" ? "p-2 text-xs" : "px-3 py-2 text-xs"
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-4 h-4 text-amber-300 transition-transform transform rotate-0 hover:rotate-12" />
        ) : (
          <Sun className="w-4 h-4 text-orange-500 transition-transform transform rotate-0 hover:rotate-45" />
        )}
      </div>

      {showLabel && (
        <span className="font-bold text-[11px] hidden sm:inline">
          {isDark ? "Night Mode" : "Light Mode"}
        </span>
      )}
    </button>
  );
}
