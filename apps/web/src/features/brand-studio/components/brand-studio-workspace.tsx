"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcButton } from "@/components/ui/rbc-button";
import { exportBrandJson } from "@/features/brand-studio/exporters/export-brand-json";
import { useBrandStore } from "@/features/brand-studio/store/brand-store";
import { downloadFile } from "@/features/theme-engine/exporters/download-file";

export function BrandStudioWorkspace() {
  const brand = useBrandStore((state) => state.brand);

  function handleExport(): void {
    downloadFile(
      "rainbowcode-brand-kit.json",
      exportBrandJson(brand),
      "application/json",
    );
  }

  return (
    <section className="space-y-6 rounded-[32px] border border-white/70 bg-white/68 p-5 shadow-[0_24px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/62 sm:p-6">
      <div className="overflow-hidden rounded-[28px] border border-white/70 bg-slate-950 text-white shadow-[0_24px_90px_rgba(15,23,42,0.18)] dark:border-white/10">
        <div className="relative overflow-hidden p-6 sm:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.42),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.20),transparent_34%)]" />

          <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2">
                <RbcBadge variant="info">Brand Studio</RbcBadge>
                <RbcBadge variant="neutral">Local workspace</RbcBadge>
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-5xl">
                Shape the design system from a real brand foundation.
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Update name, slogan, logo mark, and palette values. The current
                kit is ready to export as JSON for downstream tooling.
              </p>
            </div>

            <RbcButton variant="primary" onClick={handleExport}>
              Export Brand Kit
            </RbcButton>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <section className="rounded-[28px] border border-white/70 bg-white/82 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/76">
          <div className="flex items-center gap-4">
            <div
              className="grid size-20 shrink-0 place-items-center rounded-[24px] text-lg font-black text-white shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${brand.palette[0]?.value ?? "#4f46e5"}, ${brand.palette[1]?.value ?? "#db2777"}, ${brand.palette[2]?.value ?? "#06b6d4"})`,
              }}
            >
              {brand.logoText || "RBC"}
            </div>

            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
                Live identity
              </p>
              <h2 className="mt-2 truncate text-2xl font-black text-slate-950 dark:text-white">
                {brand.name || "Unnamed workspace"}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {brand.slogan}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {brand.palette.map((color) => (
              <div
                key={color.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70"
              >
                <div
                  className="h-16 rounded-xl border border-white/60 shadow-sm"
                  style={{ backgroundColor: color.value }}
                />
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-sm font-black text-slate-950 dark:text-white">
                    {color.name}
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    {color.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-white/70 bg-white/82 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/76">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
            Included in export
          </p>

          <div className="mt-5 space-y-3">
            {[
              "Brand name and slogan",
              "Logo mark text",
              "Palette token values",
              "JSON payload for tooling",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200"
              >
                <span className="size-2 rounded-full bg-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
