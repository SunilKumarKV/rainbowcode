"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcButton } from "@/components/ui/rbc-button";
import { ColorTokenControl } from "@/features/theme-studio/components/color-token-control";
import { RadiusTokenControl } from "@/features/theme-studio/components/radius-token-control";
import { ThemeExportPanel } from "@/features/theme-studio/components/theme-export-panel";
import { useThemeStore } from "@/features/theme-engine/store/theme-store";
import type {
  ThemeColorKey,
  ThemeTokens,
} from "@/features/theme-engine/types/theme-token";

type RadiusKey = keyof ThemeTokens["radius"];

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

export function ThemeStudioPanel() {
  const theme = useThemeStore((state) => state.theme);
  const updateColor = useThemeStore((state) => state.updateColor);
  const setTheme = useThemeStore((state) => state.setTheme);
  const resetTheme = useThemeStore((state) => state.resetTheme);

  function updateRadius(key: RadiusKey, value: string): void {
    setTheme({
      ...theme,
      radius: {
        ...theme.radius,
        [key]: value,
      },
    });
  }

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-[28px] border border-white/70 bg-white/78 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/76">
        <div className="relative overflow-hidden border-b border-slate-200/70 p-4 dark:border-slate-800">
          <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-indigo-400/20 blur-2xl" />

          <div className="relative z-10 flex items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap gap-2">
                <RbcBadge variant="info">Theme Studio</RbcBadge>
                <RbcBadge variant="success">Live Tokens</RbcBadge>
              </div>

              <h3 className="mt-3 text-lg font-black tracking-tight text-slate-950 dark:text-white">
                Brand color system
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Tune the global theme used by components, canvas, and exports.
              </p>
            </div>

            <RbcButton variant="ghost" onClick={resetTheme}>
              Reset
            </RbcButton>
          </div>
        </div>

        <div className="grid gap-3 p-4">
          <div className="grid grid-cols-4 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
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

      <section className="overflow-hidden rounded-[28px] border border-white/70 bg-white/78 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/76">
        <div className="border-b border-slate-200/70 px-4 py-4 dark:border-slate-800">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
                Radius
              </p>
              <h3 className="mt-1 text-sm font-black text-slate-950 dark:text-white">
                Shape Language
              </h3>
            </div>

            <RbcBadge variant="neutral">4 tokens</RbcBadge>
          </div>

          <p className="mt-2 text-xs leading-5 text-slate-500">
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

      <ThemeExportPanel />
    </div>
  );
}