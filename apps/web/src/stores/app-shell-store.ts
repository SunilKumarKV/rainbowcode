"use client";

import { create } from "zustand";

export type ActiveStudio = "brand" | "theme" | "components" | "canvas" | "code";

type AppShellState = {
  readonly isSidebarOpen: boolean;
  readonly isCommandPaletteOpen: boolean;
  readonly toggleSidebar: () => void;
  readonly openCommandPalette: () => void;
  readonly closeCommandPalette: () => void;
  readonly toggleCommandPalette: () => void;
};

export const useAppShellStore = create<AppShellState>((set) => ({
  isSidebarOpen: true,
  isCommandPaletteOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  openCommandPalette: () => set({ isCommandPaletteOpen: true }),
  closeCommandPalette: () => set({ isCommandPaletteOpen: false }),
  toggleCommandPalette: () =>
    set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),
}));
