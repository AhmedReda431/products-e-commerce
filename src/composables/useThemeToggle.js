// src/composables/useThemeToggle.js
import { useTheme } from "vuetify";

export function useThemeToggle() {
  const theme = useTheme();

  function toggleTheme() {
    const current = theme.global.name.value;
    const next = current === "lightTheme" ? "darkTheme" : "lightTheme";
    theme.global.name.value = next;
    localStorage.setItem("theme", next);
  }

  return {
    toggleTheme,
  };
}
