import { generateTailwindTheme } from "@/features/theme-engine/generators/tailwind-generator";
import type { ThemeTokens } from "@/features/theme-engine/types/theme-token";

export function exportTailwindTheme(theme: ThemeTokens): string {
  const tailwindTheme = JSON.stringify(generateTailwindTheme(theme), null, 2);

  return `export const tailwindTokens = ${tailwindTheme} as const;\n\nexport default tailwindTokens;\n`;
}
