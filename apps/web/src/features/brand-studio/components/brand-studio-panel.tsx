"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcButton } from "@/components/ui/rbc-button";
import { exportBrandJson } from "@/features/brand-studio/exporters/export-brand-json";
import { useBrandStore } from "@/features/brand-studio/store/brand-store";
import { downloadFile } from "@/features/theme-engine/exporters/download-file";
import { LogoBuilderPanel } from "@/features/logo-builder/components/logo-builder-panel";

export function BrandStudioPanel() {
  const brand = useBrandStore((state) => state.brand);
  const updateBrandName = useBrandStore((state) => state.updateBrandName);
  const updateBrandSlogan = useBrandStore((state) => state.updateBrandSlogan);
  const updateLogoText = useBrandStore((state) => state.updateLogoText);
  const updatePaletteColor = useBrandStore(
    (state) => state.updatePaletteColor,
  );
  const resetBrand = useBrandStore((state) => state.resetBrand);

  function exportBrand(): void {
    downloadFile(
      "rainbowcode-brand-kit.json",
      exportBrandJson(brand),
      "application/json",
    );
  }

  return (
    <section className="overflow-hidden rounded-[28px] border border-white/70 bg-white/78 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/76">
      <div className="relative overflow-hidden border-b border-slate-200/70 p-4 dark:border-slate-800">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl" />

        <div className="relative z-10 flex items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap gap-2">
              <RbcBadge variant="info">Brand Studio</RbcBadge>
              <RbcBadge variant="success">Foundation</RbcBadge>
            </div>

            <h3 className="mt-3 text-lg font-black tracking-tight text-slate-950 dark:text-white">
              Brand kit builder
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Define the core identity that will power logos, themes,
              components, templates, and exports.
            </p>
          </div>

          <RbcButton variant="ghost" onClick={resetBrand}>
            Reset
          </RbcButton>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center gap-4">
            <div
              className="grid size-16 shrink-0 place-items-center rounded-3xl text-sm font-black text-white shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${brand.palette[0]?.value ?? "#4f46e5"}, ${brand.palette[1]?.value ?? "#db2777"}, ${brand.palette[2]?.value ?? "#06b6d4"})`,
              }}
            >
              {brand.logoText}
            </div>

            <div className="min-w-0">
              <h4 className="truncate text-lg font-black text-slate-950 dark:text-white">
                {brand.name}
              </h4>
              <p className="mt-1 text-sm leading-5 text-slate-500">
                {brand.slogan}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <div>
            <label
              htmlFor="brand-name"
              className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500"
            >
              Brand Name
            </label>
            <input
              id="brand-name"
              type="text"
              value={brand.name}
              onChange={(event) => updateBrandName(event.currentTarget.value)}
              className="mt-1 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="brand-slogan"
              className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500"
            >
              Slogan
            </label>
            <input
              id="brand-slogan"
              type="text"
              value={brand.slogan}
              onChange={(event) =>
                updateBrandSlogan(event.currentTarget.value)
              }
              className="mt-1 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="brand-logo-text"
              className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500"
            >
              Logo Text
            </label>
            <input
              id="brand-logo-text"
              type="text"
              value={brand.logoText}
              maxLength={6}
              onChange={(event) => updateLogoText(event.currentTarget.value)}
              className="mt-1 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Palette
            </p>
            <RbcBadge variant="neutral">{brand.palette.length} colors</RbcBadge>
          </div>

          <div className="mt-3 grid gap-3">
            {brand.palette.map((color) => (
              <div
                key={color.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/70"
              >
                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor={`brand-color-${color.id}`}
                    className="text-xs font-black uppercase tracking-[0.14em] text-slate-500"
                  >
                    {color.name}
                  </label>
                  <span className="font-mono text-xs text-slate-500">
                    {color.value}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <input
                    id={`brand-color-${color.id}`}
                    type="color"
                    value={color.value}
                    onChange={(event) =>
                      updatePaletteColor(color.id, event.currentTarget.value)
                    }
                    className="size-11 cursor-pointer rounded-2xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                  />

                  <input
                    type="text"
                    value={color.value}
                    aria-label={`${color.name} hex value`}
                    onChange={(event) =>
                      updatePaletteColor(color.id, event.currentTarget.value)
                    }
                    className="h-11 min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-3 font-mono text-sm font-semibold text-slate-950 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <RbcButton variant="primary" onClick={exportBrand} className="w-full">
  Export Brand Kit JSON
</RbcButton>

<LogoBuilderPanel />
      </div>
    </section>
  );
}