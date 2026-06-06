import { resolveThemeTokens } from "@/features/theme-engine/resolvers/token-resolver";
import type { ThemeTokens } from "@/features/theme-engine/types/theme-token";

export function exportJsonTheme(theme: ThemeTokens): string {
  return JSON.stringify(resolveThemeTokens(theme), null, 2);
}