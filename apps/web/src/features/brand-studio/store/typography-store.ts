"use client";

import { create } from "zustand";
import type {
  BrandFontFamily,
  BrandTypographySystem,
} from "@/features/brand-studio/types/typography";

export const defaultTypographySystem: BrandTypographySystem = {
  headingFont: "Inter",
  bodyFont: "Inter",
  headingWeight: 800,
  bodyWeight: 500,
  lineHeight: 1.5,
  letterSpacing: -0.02,
  scale: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  },
};

type TypographyStoreState = {
  readonly typography: BrandTypographySystem;
  readonly updateHeadingFont: (headingFont: BrandFontFamily) => void;
  readonly updateBodyFont: (bodyFont: BrandFontFamily) => void;
  readonly updateHeadingWeight: (headingWeight: number) => void;
  readonly updateBodyWeight: (bodyWeight: number) => void;
  readonly updateLineHeight: (lineHeight: number) => void;
  readonly updateLetterSpacing: (letterSpacing: number) => void;
  readonly updateScaleToken: (
    token: keyof BrandTypographySystem["scale"],
    value: string,
  ) => void;
  readonly resetTypography: () => void;
};

export const useTypographyStore = create<TypographyStoreState>((set) => ({
  typography: defaultTypographySystem,

  updateHeadingFont: (headingFont) => {
    set((state) => ({
      typography: {
        ...state.typography,
        headingFont,
      },
    }));
  },

  updateBodyFont: (bodyFont) => {
    set((state) => ({
      typography: {
        ...state.typography,
        bodyFont,
      },
    }));
  },

  updateHeadingWeight: (headingWeight) => {
    set((state) => ({
      typography: {
        ...state.typography,
        headingWeight,
      },
    }));
  },

  updateBodyWeight: (bodyWeight) => {
    set((state) => ({
      typography: {
        ...state.typography,
        bodyWeight,
      },
    }));
  },

  updateLineHeight: (lineHeight) => {
    set((state) => ({
      typography: {
        ...state.typography,
        lineHeight,
      },
    }));
  },

  updateLetterSpacing: (letterSpacing) => {
    set((state) => ({
      typography: {
        ...state.typography,
        letterSpacing,
      },
    }));
  },

  updateScaleToken: (token, value) => {
    set((state) => ({
      typography: {
        ...state.typography,
        scale: {
          ...state.typography.scale,
          [token]: value,
        },
      },
    }));
  },

  resetTypography: () => {
    set({
      typography: defaultTypographySystem,
    });
  },
}));