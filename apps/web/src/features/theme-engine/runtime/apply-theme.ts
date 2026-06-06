import type { ThemeTokens } from "@/features/theme-engine/types/theme-token";
import { resolveThemeTokens } from "@/features/theme-engine/resolvers/token-resolver";

type CssVariableEntry = readonly [name: string, value: string];

export function getThemeCssVariables(theme: ThemeTokens): readonly CssVariableEntry[] {
  const resolvedTheme = resolveThemeTokens(theme);

  return [
    ["--color-primary", resolvedTheme.colors.primary],
    ["--color-secondary", resolvedTheme.colors.secondary],
    ["--color-background", resolvedTheme.colors.background],
    ["--color-foreground", resolvedTheme.colors.foreground],
    ["--color-success", resolvedTheme.colors.success],
    ["--color-warning", resolvedTheme.colors.warning],
    ["--color-destructive", resolvedTheme.colors.destructive],
    ["--font-family-base", resolvedTheme.typography.fontFamily],
    ["--font-size-base", resolvedTheme.typography.fontSizeBase],
    ["--line-height-base", resolvedTheme.typography.lineHeightBase],
    ["--radius-sm", resolvedTheme.radius.sm],
    ["--radius-md", resolvedTheme.radius.md],
    ["--radius-lg", resolvedTheme.radius.lg],
    ["--radius-xl", resolvedTheme.radius.xl],
    ["--spacing-xs", resolvedTheme.spacing.xs],
    ["--spacing-sm", resolvedTheme.spacing.sm],
    ["--spacing-md", resolvedTheme.spacing.md],
    ["--spacing-lg", resolvedTheme.spacing.lg],
    ["--spacing-xl", resolvedTheme.spacing.xl],
  ] as const;
}

export function applyTheme(theme: ThemeTokens): void {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;

  for (const [name, value] of getThemeCssVariables(theme)) {
    root.style.setProperty(name, value);
  }
}