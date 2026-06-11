"use client";

import { ThemePreview } from "@/features/theme-studio/components/theme-preview";
import { exportCssTheme } from "@/features/theme-engine/exporters/export-css";
import { useThemeStore } from "@/features/theme-engine/store/theme-store";

export function ThemeStudioWorkspace() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <section className="space-y-6 rounded-[32px] border border-white/70 bg-white/68 p-5 shadow-[0_24px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/62 sm:p-6">
      <div className="overflow-hidden rounded-[28px] border border-white/70 bg-slate-950 text-white shadow-[0_24px_90px_rgba(15,23,42,0.18)] dark:border-white/10">
        <div className="relative overflow-hidden p-6 sm:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(129,140,248,0.42),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.22),transparent_34%)]" />

          <div className="relative z-10 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-200">
              Theme Studio
            </p>
            <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-5xl">
              Tune real tokens and preview the exact runtime output.
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-300 sm:text-base">
              Colors and radii are validated through the theme engine, applied
              to CSS variables at runtime, and exported for downstream use.
            </p>
          </div>
        </div>
      </div>

      <ThemePreview />

      <section className="overflow-hidden rounded-[28px] border border-white/70 bg-slate-950 text-white shadow-[0_18px_70px_rgba(15,23,42,0.14)] dark:border-white/10">
        <div className="border-b border-white/10 bg-white/[0.03] px-5 py-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
            CSS export preview
          </p>
        </div>

        <pre className="max-h-80 overflow-auto p-5 text-sm leading-6 text-slate-100">
          <code>{exportCssTheme(theme)}</code>
        </pre>
      </section>
    </section>
  );
}
