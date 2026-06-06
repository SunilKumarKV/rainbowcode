"use client";

import { ColorTokenControl } from "@/features/theme-studio/components/color-token-control";
import { RadiusTokenControl } from "@/features/theme-studio/components/radius-token-control";
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
      <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
              Color Tokens
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Edit global theme colors.
            </p>
          </div>

          <button
            type="button"
            onClick={resetTheme}
            className="rounded-lg px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-300 dark:hover:bg-slate-900"
          >
            Reset
          </button>
        </div>

        <div className="mt-4 space-y-4">
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

      <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
        <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
          Radius Tokens
        </h3>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Control component corner radius.
        </p>

        <div className="mt-4 space-y-4">
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
    </div>
  );
}