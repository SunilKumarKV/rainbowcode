"use client";

import { useThemeStore } from "@/features/theme-engine/store/theme-store";

const previewColors = ["#2563eb", "#7c3aed", "#16a34a", "#dc2626"] as const;

export function ThemePreview() {
  const updateColor = useThemeStore((state) => state.updateColor);

  return (
    <section
      aria-label="Live theme preview"
      className="w-full rounded-[28px] border border-white/70 bg-white/84 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/76"
    >
      <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
        Live preview
      </p>

      <h2
        className="mt-3 text-2xl font-black text-slate-950 dark:text-white"
        style={{
          color: "var(--color-foreground)",
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--font-size-base)",
          lineHeight: "var(--line-height-base)",
        }}
      >
        Theme tokens applied through CSS variables
      </h2>

      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
        Editing the token panel updates this surface immediately, so exported
        CSS and Tailwind values match what you see in the studio.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="rounded-[24px] border border-slate-200 bg-[var(--color-background)] p-5 shadow-sm dark:border-slate-800">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Surface
              </p>
              <h3
                className="mt-2 text-xl font-black"
                style={{ color: "var(--color-foreground)" }}
              >
                Rainbow workspace
              </h3>
            </div>

            <span
              className="rounded-full px-3 py-1 text-xs font-black"
              style={{
                backgroundColor: "var(--color-secondary)",
                color: "var(--color-background)",
              }}
            >
              Secondary
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-[var(--radius-md)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Primary action
            </button>

            <button
              type="button"
              className="rounded-[var(--radius-md)] border px-4 py-2 text-sm font-semibold transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]"
              style={{
                borderColor: "var(--color-secondary)",
                color: "var(--color-secondary)",
              }}
            >
              Secondary action
            </button>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Quick swap
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {previewColors.map((color) => (
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
        </div>
      </div>
    </section>
  );
}
