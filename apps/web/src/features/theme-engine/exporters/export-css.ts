import { generateCssVariables } from "@/features/theme-engine/generators/css-generator";
import type { ThemeTokens } from "@/features/theme-engine/types/theme-token";

export function exportCssTheme(theme: ThemeTokens): string {
  return generateCssVariables(theme);
}