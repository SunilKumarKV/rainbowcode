import type { ThemeTokens } from "@/features/theme-engine/types/theme-token";

export type ThemePresetId =
  | "glass"
  | "saas"
  | "neon"
  | "minimal"
  | "gaming"
  | "luxury";

export type ThemePreset = {
  readonly id: ThemePresetId;
  readonly label: string;
  readonly description: string;
  readonly theme: ThemeTokens;
};

const presetDefinitions = [
  {
    id: "glass",
    label: "Glass",
    description: "Bright translucent surfaces with crisp blue-violet accents.",
    theme: {
      version: "1.0.0",
      colors: {
        primary: "#3b82f6",
        secondary: "#8b5cf6",
        background: "#f8fbff",
        foreground: "#0f172a",
        success: "#10b981",
        warning: "#f59e0b",
        destructive: "#ef4444",
      },
      typography: {
        fontFamily: "Inter, system-ui, sans-serif",
        fontSizeBase: "1rem",
        lineHeightBase: "1.6",
      },
      radius: {
        sm: "0.5rem",
        md: "0.875rem",
        lg: "1.25rem",
        xl: "1.75rem",
      },
      spacing: {
        xs: "0.25rem",
        sm: "0.625rem",
        md: "1rem",
        lg: "1.75rem",
        xl: "2.5rem",
      },
    },
  },
  {
    id: "saas",
    label: "SaaS",
    description: "Balanced product defaults for everyday software workflows.",
    theme: {
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
    },
  },
  {
    id: "neon",
    label: "Neon",
    description: "High-contrast dark theme with electric cyan and magenta.",
    theme: {
      version: "1.0.0",
      colors: {
        primary: "#22d3ee",
        secondary: "#f472b6",
        background: "#09090f",
        foreground: "#f8fafc",
        success: "#4ade80",
        warning: "#facc15",
        destructive: "#fb7185",
      },
      typography: {
        fontFamily: "Space Grotesk, Inter, system-ui, sans-serif",
        fontSizeBase: "1rem",
        lineHeightBase: "1.55",
      },
      radius: {
        sm: "0.375rem",
        md: "0.75rem",
        lg: "1.125rem",
        xl: "1.5rem",
      },
      spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2.25rem",
      },
    },
  },
  {
    id: "minimal",
    label: "Minimal",
    description: "Quiet grayscale palette with restrained geometry and rhythm.",
    theme: {
      version: "1.0.0",
      colors: {
        primary: "#171717",
        secondary: "#525252",
        background: "#fafaf9",
        foreground: "#111111",
        success: "#166534",
        warning: "#a16207",
        destructive: "#b91c1c",
      },
      typography: {
        fontFamily: "Inter, system-ui, sans-serif",
        fontSizeBase: "0.95rem",
        lineHeightBase: "1.6",
      },
      radius: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
      },
      spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "0.875rem",
        lg: "1.25rem",
        xl: "1.75rem",
      },
    },
  },
  {
    id: "gaming",
    label: "Gaming",
    description: "Bold dark chrome with vivid violet and emerald contrast.",
    theme: {
      version: "1.0.0",
      colors: {
        primary: "#8b5cf6",
        secondary: "#10b981",
        background: "#0b1120",
        foreground: "#f8fafc",
        success: "#22c55e",
        warning: "#f97316",
        destructive: "#ef4444",
      },
      typography: {
        fontFamily: "Sora, Inter, system-ui, sans-serif",
        fontSizeBase: "1rem",
        lineHeightBase: "1.5",
      },
      radius: {
        sm: "0.375rem",
        md: "0.75rem",
        lg: "1.25rem",
        xl: "1.75rem",
      },
      spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.75rem",
        xl: "2.5rem",
      },
    },
  },
  {
    id: "luxury",
    label: "Luxury",
    description: "Warm dark neutrals with polished gold accents and softer pacing.",
    theme: {
      version: "1.0.0",
      colors: {
        primary: "#d4a017",
        secondary: "#7c5c2e",
        background: "#14110f",
        foreground: "#f8f1e7",
        success: "#65a30d",
        warning: "#f59e0b",
        destructive: "#dc2626",
      },
      typography: {
        fontFamily: "Manrope, Inter, system-ui, sans-serif",
        fontSizeBase: "1rem",
        lineHeightBase: "1.65",
      },
      radius: {
        sm: "0.375rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
      },
      spacing: {
        xs: "0.25rem",
        sm: "0.625rem",
        md: "1rem",
        lg: "1.625rem",
        xl: "2.25rem",
      },
    },
  },
] as const satisfies readonly ThemePreset[];

export const themePresets = presetDefinitions;

export function getThemePresetById(presetId: ThemePresetId): ThemePreset {
  const preset = themePresets.find((entry) => entry.id === presetId);

  if (preset === undefined) {
    throw new Error(`Unknown theme preset: ${presetId}`);
  }

  return preset;
}

export function getMatchingThemePresetId(
  theme: ThemeTokens,
): ThemePresetId | null {
  const themeSignature = JSON.stringify(theme);

  return (
    themePresets.find((preset) => JSON.stringify(preset.theme) === themeSignature)
      ?.id ?? null
  );
}
