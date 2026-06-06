"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/features/theme-engine/store/theme-store";
import { applyTheme } from "@/features/theme-engine/runtime/apply-theme";

export function useThemeRuntime(): void {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);
}