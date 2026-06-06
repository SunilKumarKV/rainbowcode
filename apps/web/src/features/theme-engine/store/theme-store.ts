"use client";

import { create } from "zustand";
import { defaultTheme } from "@/features/theme-engine/constants/default-theme";
import type {
  ThemeColorKey,
  ThemeTokens,
} from "@/features/theme-engine/types/theme-token";
import { themeSchema } from "@/features/theme-engine/validation/theme-schema";

type ThemeStoreState = {
  readonly theme: ThemeTokens;
  readonly setTheme: (theme: ThemeTokens) => void;
  readonly updateColor: (key: ThemeColorKey, value: string) => void;
  readonly resetTheme: () => void;
};

export const useThemeStore = create<ThemeStoreState>((set) => ({
  theme: themeSchema.parse(defaultTheme),

  setTheme: (theme) => {
    const validatedTheme = themeSchema.parse(theme);
    set({ theme: validatedTheme });
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
      };
    });
  },

  resetTheme: () => {
    set({ theme: themeSchema.parse(defaultTheme) });
  },
}));