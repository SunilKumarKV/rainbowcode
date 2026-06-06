import type { ThemeTokens } from "@/features/theme-engine/types/theme-token";

export const defaultTheme: ThemeTokens = {
  version: "1.0.0",
  colors: {
    primary: "#2563eb",
    secondary: "#7c3aed",
    background: "#ffffff",
    foreground: "#0f172a",
    success: "#16a34a",
    warning: "#f59e0b",
    destructive: "#dc2626",
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    fontSizeBase: "1rem",
    lineHeightBase: "1.5",
  },
  radius: {
    sm: "0.375rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
};