import type { ThemeTokens } from "@/features/theme-engine/types/theme-token";
import { getThemeCssVariables } from "@/features/theme-engine/runtime/apply-theme";

export function generateCssVariables(theme: ThemeTokens): string {
  const lines: string[] = [":root {"];

  for (const [name, value] of getThemeCssVariables(theme)) {
    lines.push(`  ${name}: ${value};`);
  }

  lines.push("}");

  return lines.join("\n");
}
