import { generateTailwindTheme } from "@/features/theme-engine/generators/tailwind-generator";
import type { ThemeTokens } from "@/features/theme-engine/types/theme-token";

export function exportTailwindTheme(theme: ThemeTokens): string {
  return JSON.stringify(generateTailwindTheme(theme), null, 2);
}