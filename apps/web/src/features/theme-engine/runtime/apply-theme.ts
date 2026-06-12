import type { ThemeTokens } from "@/features/theme-engine/types/theme-token";
import { resolveThemeTokens } from "@/features/theme-engine/resolvers/token-resolver";

type CssVariableEntry = readonly [name: string, value: string];

function hexToRgb(hex: string): readonly [number, number, number] {
  const normalizedHex = hex.replace("#", "");
  const expandedHex =
    normalizedHex.length === 3
      ? normalizedHex
          .split("")
          .map((character) => `${character}${character}`)
          .join("")
      : normalizedHex;

  const red = Number.parseInt(expandedHex.slice(0, 2), 16);
  const green = Number.parseInt(expandedHex.slice(2, 4), 16);
  const blue = Number.parseInt(expandedHex.slice(4, 6), 16);

  return [red, green, blue];
}

function withAlpha(hex: string, alpha: number): string {
  const [red, green, blue] = hexToRgb(hex);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function mixHex(source: string, target: string, ratio: number): string {
  const [sourceRed, sourceGreen, sourceBlue] = hexToRgb(source);
  const [targetRed, targetGreen, targetBlue] = hexToRgb(target);
  const clampedRatio = Math.max(0, Math.min(1, ratio));

  const mixChannel = (start: number, end: number): number =>
    Math.round(start + (end - start) * clampedRatio);

  const channels = [
    mixChannel(sourceRed, targetRed),
    mixChannel(sourceGreen, targetGreen),
    mixChannel(sourceBlue, targetBlue),
  ];

  return `#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

function getReadableTextColor(hex: string): string {
  const [red, green, blue] = hexToRgb(hex);
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000;

  return luminance >= 160 ? "#020617" : "#ffffff";
}

export function getThemeCssVariables(theme: ThemeTokens): readonly CssVariableEntry[] {
  const resolvedTheme = resolveThemeTokens(theme);
  const panelSurface = withAlpha(resolvedTheme.colors.background, 0.84);
  const cardSurface = withAlpha(resolvedTheme.colors.background, 0.78);
  const mutedSurface = mixHex(
    resolvedTheme.colors.background,
    resolvedTheme.colors.foreground,
    0.04,
  );
  const mutedSurfaceStrong = mixHex(
    resolvedTheme.colors.background,
    resolvedTheme.colors.foreground,
    0.08,
  );
  const editorSurface = mixHex(
    resolvedTheme.colors.foreground,
    resolvedTheme.colors.background,
    0.08,
  );
  const appBackground = `radial-gradient(circle at top left, ${withAlpha(
    resolvedTheme.colors.primary,
    0.22,
  )}, transparent 32rem), radial-gradient(circle at top right, ${withAlpha(
    resolvedTheme.colors.secondary,
    0.16,
  )}, transparent 28rem), linear-gradient(180deg, ${resolvedTheme.colors.background} 0%, ${mixHex(
    resolvedTheme.colors.background,
    resolvedTheme.colors.primary,
    0.08,
  )} 48%, ${resolvedTheme.colors.background} 100%)`;

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
    ["--theme-text-muted", withAlpha(resolvedTheme.colors.foreground, 0.68)],
    ["--theme-text-subtle", withAlpha(resolvedTheme.colors.foreground, 0.52)],
    ["--theme-border-soft", withAlpha(resolvedTheme.colors.foreground, 0.12)],
    ["--theme-border-strong", withAlpha(resolvedTheme.colors.foreground, 0.18)],
    ["--theme-focus-ring", resolvedTheme.colors.primary],
    ["--theme-focus-ring-soft", withAlpha(resolvedTheme.colors.primary, 0.14)],
    ["--theme-focus-ring-offset", resolvedTheme.colors.background],
    ["--theme-selection", withAlpha(resolvedTheme.colors.primary, 0.24)],
    ["--surface-foreground", resolvedTheme.colors.foreground],
    ["--surface-background", resolvedTheme.colors.background],
    ["--surface-app", appBackground],
    ["--surface-panel", panelSurface],
    ["--surface-panel-strong", resolvedTheme.colors.background],
    ["--surface-card", cardSurface],
    ["--surface-card-strong", withAlpha(resolvedTheme.colors.background, 0.92)],
    ["--surface-muted", mutedSurface],
    ["--surface-muted-strong", mutedSurfaceStrong],
    ["--surface-editor", editorSurface],
    ["--surface-editor-muted", withAlpha(resolvedTheme.colors.background, 0.06)],
    ["--surface-accent-soft", withAlpha(resolvedTheme.colors.primary, 0.12)],
    ["--surface-accent-strong", withAlpha(resolvedTheme.colors.primary, 0.18)],
    ["--surface-success-soft", withAlpha(resolvedTheme.colors.success, 0.14)],
    ["--surface-warning-soft", withAlpha(resolvedTheme.colors.warning, 0.14)],
    ["--surface-danger-soft", withAlpha(resolvedTheme.colors.destructive, 0.14)],
    ["--surface-on-primary", getReadableTextColor(resolvedTheme.colors.primary)],
    [
      "--surface-on-secondary",
      getReadableTextColor(resolvedTheme.colors.secondary),
    ],
    ["--surface-on-success", getReadableTextColor(resolvedTheme.colors.success)],
    ["--surface-on-warning", getReadableTextColor(resolvedTheme.colors.warning)],
    [
      "--surface-on-destructive",
      getReadableTextColor(resolvedTheme.colors.destructive),
    ],
    ["--surface-on-editor", getReadableTextColor(editorSurface)],
    [
      "--shadow-soft",
      `0 18px 70px ${withAlpha(resolvedTheme.colors.foreground, 0.08)}`,
    ],
    [
      "--shadow-medium",
      `0 24px 90px ${withAlpha(resolvedTheme.colors.foreground, 0.1)}`,
    ],
    [
      "--shadow-strong",
      `0 30px 100px ${withAlpha(resolvedTheme.colors.foreground, 0.18)}`,
    ],
    ["--editor-grid-background", mixHex(resolvedTheme.colors.background, resolvedTheme.colors.primary, 0.08)],
    ["--editor-grid-line", withAlpha(resolvedTheme.colors.primary, 0.1)],
    ["--scrollbar-thumb", withAlpha(resolvedTheme.colors.foreground, 0.32)],
    ["--scrollbar-thumb-hover", withAlpha(resolvedTheme.colors.primary, 0.72)],
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
