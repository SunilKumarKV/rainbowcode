"use client";

import { ThemePreview } from "@/features/theme-studio/components/theme-preview";
import { exportCssTheme } from "@/features/theme-engine/exporters/export-css";
import { useThemeStore } from "@/features/theme-engine/store/theme-store";

export function ThemeStudioWorkspace() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <section className="space-y-6 rounded-[32px] rbc-surface-card p-5 sm:p-6">
      <div className="overflow-hidden rounded-[28px] border border-[var(--theme-border-soft)] bg-[var(--surface-editor)] text-[var(--surface-on-editor)] shadow-[var(--shadow-medium)]">
        <div className="relative overflow-hidden p-6 sm:p-7">
          <div className="absolute inset-0 [background:radial-gradient(circle_at_top_left,var(--surface-accent-soft),transparent_34%),radial-gradient(circle_at_bottom_right,var(--surface-success-soft),transparent_34%)]" />

          <div className="relative z-10 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--color-primary)]">
              Theme Studio
            </p>
            <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-5xl">
              Build themes visually and verify the exact runtime output.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[color:rgba(255,255,255,0.78)] sm:text-base">
              Presets, token controls, imports, and exports all run through the
              existing theme engine, so what you preview here is what the product
              and downstream apps receive.
            </p>
          </div>
        </div>
      </div>

      <ThemePreview />

      <section className="overflow-hidden rounded-[28px] border border-[var(--theme-border-soft)] bg-[var(--surface-editor)] text-[var(--surface-on-editor)] shadow-[var(--shadow-medium)]">
        <div className="border-b border-[var(--theme-border-soft)] bg-[var(--surface-editor-muted)] px-5 py-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[color:rgba(255,255,255,0.68)]">
            CSS export preview
          </p>
        </div>

        <pre className="max-h-80 overflow-auto p-5 text-sm leading-6 text-[var(--surface-on-editor)]">
          <code>{exportCssTheme(theme)}</code>
        </pre>
      </section>
    </section>
  );
}
