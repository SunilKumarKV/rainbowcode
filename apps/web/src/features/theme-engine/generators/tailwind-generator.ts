import type { ThemeTokens } from "@/features/theme-engine/types/theme-token";
import { resolveThemeTokens } from "@/features/theme-engine/resolvers/token-resolver";

export type GeneratedTailwindTheme = {
  readonly colors: {
    readonly primary: string;
    readonly secondary: string;
    readonly background: string;
    readonly foreground: string;
    readonly success: string;
    readonly warning: string;
    readonly destructive: string;
  };
  readonly fontFamily: {
    readonly sans: readonly string[];
  };
  readonly fontSize: {
    readonly base: string;
  };
  readonly lineHeight: {
    readonly base: string;
  };
  readonly borderRadius: {
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
    readonly xl: string;
  };
  readonly spacing: {
    readonly xs: string;
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
    readonly xl: string;
  };
};

export function generateTailwindTheme(
  theme: ThemeTokens,
): GeneratedTailwindTheme {
  const resolvedTheme = resolveThemeTokens(theme);

  return {
    colors: {
      primary: resolvedTheme.colors.primary,
      secondary: resolvedTheme.colors.secondary,
      background: resolvedTheme.colors.background,
      foreground: resolvedTheme.colors.foreground,
      success: resolvedTheme.colors.success,
      warning: resolvedTheme.colors.warning,
      destructive: resolvedTheme.colors.destructive,
    },
    fontFamily: {
      sans: [resolvedTheme.typography.fontFamily],
    },
    fontSize: {
      base: resolvedTheme.typography.fontSizeBase,
    },
    lineHeight: {
      base: resolvedTheme.typography.lineHeightBase,
    },
    borderRadius: {
      sm: resolvedTheme.radius.sm,
      md: resolvedTheme.radius.md,
      lg: resolvedTheme.radius.lg,
      xl: resolvedTheme.radius.xl,
    },
    spacing: {
      xs: resolvedTheme.spacing.xs,
      sm: resolvedTheme.spacing.sm,
      md: resolvedTheme.spacing.md,
      lg: resolvedTheme.spacing.lg,
      xl: resolvedTheme.spacing.xl,
    },
  };
}