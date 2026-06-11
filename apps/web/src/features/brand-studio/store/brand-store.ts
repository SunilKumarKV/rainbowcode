"use client";

import { create } from "zustand";
import type { BrandKit } from "@/features/brand-studio/types/brand";

export const defaultBrandKit: BrandKit = {
  name: "RainbowCode",
  slogan: "Design visually. Ship clean code.",
  logoText: "RBC",
  palette: [
    { id: "primary", name: "Primary", value: "#4f46e5" },
    { id: "accent", name: "Accent", value: "#db2777" },
    { id: "cyan", name: "Cyan", value: "#06b6d4" },
    { id: "dark", name: "Dark", value: "#020617" },
  ],
};

type BrandStoreState = {
  readonly brand: BrandKit;
  readonly updateBrandName: (name: string) => void;
  readonly updateBrandSlogan: (slogan: string) => void;
  readonly updateLogoText: (logoText: string) => void;
  readonly updatePaletteColor: (colorId: string, value: string) => void;
  readonly resetBrand: () => void;
};

export const useBrandStore = create<BrandStoreState>((set) => ({
  brand: defaultBrandKit,

  updateBrandName: (name) => {
    set((state) => ({
      brand: {
        ...state.brand,
        name,
      },
    }));
  },

  updateBrandSlogan: (slogan) => {
    set((state) => ({
      brand: {
        ...state.brand,
        slogan,
      },
    }));
  },

  updateLogoText: (logoText) => {
    set((state) => ({
      brand: {
        ...state.brand,
        logoText,
      },
    }));
  },

  updatePaletteColor: (colorId, value) => {
    set((state) => ({
      brand: {
        ...state.brand,
        palette: state.brand.palette.map((color) =>
          color.id === colorId
            ? {
                ...color,
                value,
              }
            : color,
        ),
      },
    }));
  },

  resetBrand: () => {
    set({
      brand: defaultBrandKit,
    });
  },
}));