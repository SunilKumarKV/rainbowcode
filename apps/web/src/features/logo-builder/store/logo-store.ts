"use client";

import { create } from "zustand";
import type {
  LogoConfig,
  LogoFontFamily,
  LogoGradientDirection,
} from "@/features/logo-builder/types/logo";

export const defaultLogoConfig: LogoConfig = {
  text: "RainbowCode",
  tagline: "Design visually. Ship clean code.",
  fontFamily: "Inter",
  fontWeight: 800,
  letterSpacing: -2,
  primaryColor: "#4f46e5",
  secondaryColor: "#db2777",
  backgroundColor: "#020617",
  gradientDirection: "to-bottom-right",
  radius: 32,
};

type LogoStoreState = {
  readonly logo: LogoConfig;
  readonly updateText: (text: string) => void;
  readonly updateTagline: (tagline: string) => void;
  readonly updateFontFamily: (fontFamily: LogoFontFamily) => void;
  readonly updateFontWeight: (fontWeight: number) => void;
  readonly updateLetterSpacing: (letterSpacing: number) => void;
  readonly updatePrimaryColor: (primaryColor: string) => void;
  readonly updateSecondaryColor: (secondaryColor: string) => void;
  readonly updateBackgroundColor: (backgroundColor: string) => void;
  readonly updateGradientDirection: (
    gradientDirection: LogoGradientDirection,
  ) => void;
  readonly updateRadius: (radius: number) => void;
  readonly resetLogo: () => void;
};

export const useLogoStore = create<LogoStoreState>((set) => ({
  logo: defaultLogoConfig,

  updateText: (text) => {
    set((state) => ({
      logo: {
        ...state.logo,
        text,
      },
    }));
  },

  updateTagline: (tagline) => {
    set((state) => ({
      logo: {
        ...state.logo,
        tagline,
      },
    }));
  },

  updateFontFamily: (fontFamily) => {
    set((state) => ({
      logo: {
        ...state.logo,
        fontFamily,
      },
    }));
  },

  updateFontWeight: (fontWeight) => {
    set((state) => ({
      logo: {
        ...state.logo,
        fontWeight,
      },
    }));
  },

  updateLetterSpacing: (letterSpacing) => {
    set((state) => ({
      logo: {
        ...state.logo,
        letterSpacing,
      },
    }));
  },

  updatePrimaryColor: (primaryColor) => {
    set((state) => ({
      logo: {
        ...state.logo,
        primaryColor,
      },
    }));
  },

  updateSecondaryColor: (secondaryColor) => {
    set((state) => ({
      logo: {
        ...state.logo,
        secondaryColor,
      },
    }));
  },

  updateBackgroundColor: (backgroundColor) => {
    set((state) => ({
      logo: {
        ...state.logo,
        backgroundColor,
      },
    }));
  },

  updateGradientDirection: (gradientDirection) => {
    set((state) => ({
      logo: {
        ...state.logo,
        gradientDirection,
      },
    }));
  },

  updateRadius: (radius) => {
    set((state) => ({
      logo: {
        ...state.logo,
        radius,
      },
    }));
  },

  resetLogo: () => {
    set({
      logo: defaultLogoConfig,
    });
  },
}));