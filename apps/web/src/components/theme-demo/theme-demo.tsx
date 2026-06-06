"use client";

import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/features/theme-engine/store/theme-store";

const demoColors = ["#2563eb", "#7c3aed", "#16a34a", "#dc2626"] as const;

export function ThemeDemo() {
  const updateColor = useThemeStore((state) => state.updateColor);
  const resetTheme = useThemeStore((state) => state.resetTheme);

  return (
    <section
      aria-label="Live theme preview"
      className="w-full max-w-xl rounded-[var(--radius-xl)] border border-slate-200 bg-white p-[var(--spacing-lg)] shadow-xl dark:border-slate-800 dark:bg-slate-950"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        Live Theme Preview
      </p>

      <h2
        className="mt-2 text-2xl font-bold"
        style={{
          color: "var(--color-foreground)",
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--font-size-base)",
          lineHeight: "var(--line-height-base)",
        }}
      >
        Token-driven interface
      </h2>

      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
        Change the primary token and RainbowCode updates the visual system using
        CSS variables generated from the Theme Engine.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {demoColors.map((color) => (
          <button
            key={color}
            type="button"
            aria-label={`Set primary color to ${color}`}
            className="size-10 rounded-full border border-slate-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 dark:border-slate-700"
            style={{ backgroundColor: color }}
            onClick={() => updateColor("primary", color)}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-[var(--radius-md)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Primary Action
        </button>

        <Button variant="secondary" onClick={resetTheme}>
          Reset Theme
        </Button>
      </div>
    </section>
  );
}