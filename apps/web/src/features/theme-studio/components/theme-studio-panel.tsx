"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcButton } from "@/components/ui/rbc-button";
import { ColorTokenControl } from "@/features/theme-studio/components/color-token-control";
import { RadiusTokenControl } from "@/features/theme-studio/components/radius-token-control";
import { SpacingTokenControl } from "@/features/theme-studio/components/spacing-token-control";
import { ThemeExportPanel } from "@/features/theme-studio/components/theme-export-panel";
import { ThemePresetPicker } from "@/features/theme-studio/components/theme-preset-picker";
import { TypographyTokenControl } from "@/features/theme-studio/components/typography-token-control";
import { useThemeStore } from "@/features/theme-engine/store/theme-store";
import type {
  ThemeColorKey,
  ThemeTokens,
} from "@/features/theme-engine/types/theme-token";

type RadiusKey = keyof ThemeTokens["radius"];
type SpacingKey = keyof ThemeTokens["spacing"];

const colorControls: readonly {
  readonly label: string;
  readonly key: ThemeColorKey;
}[] = [
  { label: "Primary", key: "primary" },
  { label: "Secondary", key: "secondary" },
  { label: "Background", key: "background" },
  { label: "Foreground", key: "foreground" },
  { label: "Success", key: "success" },
  { label: "Warning", key: "warning" },
  { label: "Destructive", key: "destructive" },
];

const radiusControls: readonly {
  readonly label: string;
  readonly key: RadiusKey;
}[] = [
  { label: "Small", key: "sm" },
  { label: "Medium", key: "md" },
  { label: "Large", key: "lg" },
  { label: "Extra Large", key: "xl" },
];

const spacingControls: readonly {
  readonly label: string;
  readonly key: SpacingKey;
}[] = [
  { label: "Extra Small", key: "xs" },
  { label: "Small", key: "sm" },
  { label: "Medium", key: "md" },
  { label: "Large", key: "lg" },
  { label: "Extra Large", key: "xl" },
];

export function ThemeStudioPanel() {
  const theme = useThemeStore((state) => state.theme);
  const activePresetId = useThemeStore((state) => state.activePresetId);
  const applyPreset = useThemeStore((state) => state.applyPreset);
  const updateColor = useThemeStore((state) => state.updateColor);
  const updateTypography = useThemeStore((state) => state.updateTypography);
  const updateRadius = useThemeStore((state) => state.updateRadius);
  const updateSpacing = useThemeStore((state) => state.updateSpacing);
  const resetTheme = useThemeStore((state) => state.resetTheme);

  return (
    <div className="space-y-4">
      <ThemePresetPicker
        activePresetId={activePresetId}
        onSelectPreset={applyPreset}
      />

      <section className="overflow-hidden rounded-[28px] rbc-surface-card">
        <div className="relative overflow-hidden border-b border-[var(--theme-border-soft)] p-4">
          <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-indigo-400/20 blur-2xl" />

          <div className="relative z-10 flex items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap gap-2">
                <RbcBadge variant="info">Theme Studio</RbcBadge>
                <RbcBadge variant="success">Live Tokens</RbcBadge>
                <RbcBadge variant="neutral">
                  {activePresetId === "custom" ? "Custom" : activePresetId}
                </RbcBadge>
              </div>

              <h3 className="mt-3 text-lg font-black tracking-tight text-[var(--surface-foreground)]">
                Theme token system
              </h3>

              <p className="mt-1 text-xs leading-5 text-[var(--theme-text-muted)]">
                Tune colors, typography, shape, and spacing with the same runtime
                tokens used across the shell, studios, and exports.
              </p>
            </div>

            <RbcButton variant="ghost" onClick={resetTheme}>
              Reset
            </RbcButton>
          </div>
        </div>

        <div className="grid gap-3 p-4">
          <div className="grid grid-cols-4 overflow-hidden rounded-3xl border border-[var(--theme-border-soft)]">
            <div
              className="h-12"
              style={{ backgroundColor: theme.colors.primary }}
            />
            <div
              className="h-12"
              style={{ backgroundColor: theme.colors.secondary }}
            />
            <div
              className="h-12"
              style={{ backgroundColor: theme.colors.success }}
            />
            <div
              className="h-12"
              style={{ backgroundColor: theme.colors.destructive }}
            />
          </div>

          {colorControls.map((control) => (
            <ColorTokenControl
              key={control.key}
              label={control.label}
              tokenKey={control.key}
              value={theme.colors[control.key]}
              onChange={updateColor}
            />
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-[28px] rbc-surface-card">
        <div className="border-b border-[var(--theme-border-soft)] px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                Typography
              </p>
              <h3 className="mt-1 text-sm font-black text-[var(--surface-foreground)]">
                Reading system
              </h3>
            </div>

            <RbcBadge variant="neutral">3 tokens</RbcBadge>
          </div>

          <p className="mt-2 text-xs leading-5 text-[var(--theme-text-muted)]">
            Control base font family, size, and vertical rhythm for shared UI.
          </p>
        </div>

        <div className="grid gap-3 p-4">
          <TypographyTokenControl
            id="theme-font-family"
            label="Font Family"
            description="Applied to shared shell, forms, and previews."
            value={theme.typography.fontFamily}
            placeholder="Inter, system-ui, sans-serif"
            onChange={(value) => updateTypography("fontFamily", value)}
          />

          <TypographyTokenControl
            id="theme-font-size-base"
            label="Base Font Size"
            description="Use rem values to keep exports production-safe."
            value={theme.typography.fontSizeBase}
            placeholder="1rem"
            onChange={(value) => updateTypography("fontSizeBase", value)}
          />

          <TypographyTokenControl
            id="theme-line-height-base"
            label="Line Height"
            description="Unitless line-height improves readability and export compatibility."
            value={theme.typography.lineHeightBase}
            placeholder="1.5"
            onChange={(value) => updateTypography("lineHeightBase", value)}
          />
        </div>
      </section>

      <section className="overflow-hidden rounded-[28px] rbc-surface-card">
        <div className="border-b border-[var(--theme-border-soft)] px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                Radius
              </p>
              <h3 className="mt-1 text-sm font-black text-[var(--surface-foreground)]">
                Shape Language
              </h3>
            </div>

            <RbcBadge variant="neutral">4 tokens</RbcBadge>
          </div>

          <p className="mt-2 text-xs leading-5 text-[var(--theme-text-muted)]">
            Control the roundness system used across generated UI.
          </p>
        </div>

        <div className="grid gap-3 p-4">
          {radiusControls.map((control) => (
            <RadiusTokenControl
              key={control.key}
              label={control.label}
              tokenKey={control.key}
              value={theme.radius[control.key]}
              onChange={updateRadius}
            />
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-[28px] rbc-surface-card">
        <div className="border-b border-[var(--theme-border-soft)] px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                Spacing
              </p>
              <h3 className="mt-1 text-sm font-black text-[var(--surface-foreground)]">
                Layout rhythm
              </h3>
            </div>

            <RbcBadge variant="neutral">5 tokens</RbcBadge>
          </div>

          <p className="mt-2 text-xs leading-5 text-[var(--theme-text-muted)]">
            Adjust shared spacing tokens used to shape component and shell density.
          </p>
        </div>

        <div className="grid gap-3 p-4">
          {spacingControls.map((control) => (
            <SpacingTokenControl
              key={control.key}
              label={control.label}
              tokenKey={control.key}
              value={theme.spacing[control.key]}
              onChange={updateSpacing}
            />
          ))}
        </div>
      </section>

      <ThemeExportPanel />
    </div>
  );
}
