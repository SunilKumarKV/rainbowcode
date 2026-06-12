import type { ThemeTokens } from "@/features/theme-engine/types/theme-token";
import { themeSchema } from "@/features/theme-engine/validation/theme-schema";

export function importThemeJson(themeJson: string): ThemeTokens {
  let parsedTheme: unknown;

  try {
    parsedTheme = JSON.parse(themeJson);
  } catch {
    throw new Error("Invalid theme.json: expected valid JSON.");
  }

  return themeSchema.parse(parsedTheme);
}
