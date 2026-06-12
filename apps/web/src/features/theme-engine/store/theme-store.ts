"use client";

import { create } from "zustand";
import { defaultTheme } from "@/features/theme-engine/constants/default-theme";
import {
  getMatchingThemePresetId,
  getThemePresetById,
  type ThemePresetId,
} from "@/features/theme-engine/presets/theme-presets";
import type {
  ThemeColorKey,
  ThemeTokens,
} from "@/features/theme-engine/types/theme-token";
import { themeSchema } from "@/features/theme-engine/validation/theme-schema";

type ThemeTypographyKey = keyof ThemeTokens["typography"];
type ThemeRadiusKey = keyof ThemeTokens["radius"];
type ThemeSpacingKey = keyof ThemeTokens["spacing"];

type ThemeStoreState = {
  readonly theme: ThemeTokens;
  readonly activePresetId: ThemePresetId | "custom";
  readonly setTheme: (theme: ThemeTokens) => void;
  readonly applyPreset: (presetId: ThemePresetId) => void;
  readonly updateColor: (key: ThemeColorKey, value: string) => void;
  readonly updateTypography: (key: ThemeTypographyKey, value: string) => void;
  readonly updateRadius: (key: ThemeRadiusKey, value: string) => void;
  readonly updateSpacing: (key: ThemeSpacingKey, value: string) => void;
  readonly resetTheme: () => void;
};

function getPresetState(theme: ThemeTokens): ThemePresetId | "custom" {
  return getMatchingThemePresetId(theme) ?? "custom";
}

export const useThemeStore = create<ThemeStoreState>((set) => ({
  theme: themeSchema.parse(defaultTheme),
  activePresetId: getPresetState(defaultTheme),

  setTheme: (theme) => {
    const validatedTheme = themeSchema.parse(theme);
    set({
      theme: validatedTheme,
      activePresetId: getPresetState(validatedTheme),
    });
  },

  applyPreset: (presetId) => {
    const presetTheme = themeSchema.parse(getThemePresetById(presetId).theme);
    set({
      theme: presetTheme,
      activePresetId: presetId,
    });
  },

  updateColor: (key, value) => {
    set((state) => {
      const nextTheme: ThemeTokens = {
        ...state.theme,
        colors: {
          ...state.theme.colors,
          [key]: value,
        },
      };

      return {
        theme: themeSchema.parse(nextTheme),
        activePresetId: "custom",
      };
    });
  },

  updateTypography: (key, value) => {
    set((state) => {
      const nextTheme: ThemeTokens = {
        ...state.theme,
        typography: {
          ...state.theme.typography,
          [key]: value,
        },
      };

      return {
        theme: themeSchema.parse(nextTheme),
        activePresetId: "custom",
      };
    });
  },

  updateRadius: (key, value) => {
    set((state) => {
      const nextTheme: ThemeTokens = {
        ...state.theme,
        radius: {
          ...state.theme.radius,
          [key]: value,
        },
      };

      return {
        theme: themeSchema.parse(nextTheme),
        activePresetId: "custom",
      };
    });
  },

  updateSpacing: (key, value) => {
    set((state) => {
      const nextTheme: ThemeTokens = {
        ...state.theme,
        spacing: {
          ...state.theme.spacing,
          [key]: value,
        },
      };

      return {
        theme: themeSchema.parse(nextTheme),
        activePresetId: "custom",
      };
    });
  },

  resetTheme: () => {
    set({
      theme: themeSchema.parse(defaultTheme),
      activePresetId: getPresetState(defaultTheme),
    });
  },
}));
