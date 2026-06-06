"use client";

import type { ReactNode } from "react";
import { useThemeRuntime } from "@/features/theme-engine/runtime/use-theme-runtime";

type ThemeProviderProps = {
  readonly children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  useThemeRuntime();

  return children;
}