"use client";

import { create } from "zustand";

export type ActiveStudio = "brand" | "theme" | "components" | "canvas" | "code";

type AppShellState = {
  activeStudio: ActiveStudio;
  isSidebarOpen: boolean;
  isCodePanelOpen: boolean;
  generatedCode: string;
  setActiveStudio: (studio: ActiveStudio) => void;
  toggleSidebar: () => void;
  toggleCodePanel: () => void;
  setGeneratedCode: (code: string) => void;
};

export const useAppShellStore = create<AppShellState>((set) => ({
  activeStudio: "brand",
  isSidebarOpen: true,
  isCodePanelOpen: true,
  generatedCode: `<button className="rounded-xl bg-primary px-4 py-2 text-primary-foreground">
  RainbowCode Button
</button>`,
  setActiveStudio: (studio) => set({ activeStudio: studio }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleCodePanel: () =>
    set((state) => ({ isCodePanelOpen: !state.isCodePanelOpen })),
  setGeneratedCode: (code) => set({ generatedCode: code }),
}));