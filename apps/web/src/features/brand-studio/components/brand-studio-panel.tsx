"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcButton } from "@/components/ui/rbc-button";
import { rbcField } from "@/lib/design-system/ui-tokens";
import { exportBrandJson } from "@/features/brand-studio/exporters/export-brand-json";
import { useBrandStore } from "@/features/brand-studio/store/brand-store";
import { downloadFile } from "@/features/theme-engine/exporters/download-file";
import { LogoBuilderPanel } from "@/features/logo-builder/components/logo-builder-panel";
import { TypographySystemPanel } from "@/features/brand-studio/components/typography-system-panel";

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
    <section className="overflow-hidden rounded-[28px] rbc-surface-card">
      <div className="relative overflow-hidden border-b border-[var(--theme-border-soft)] p-4">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl" />

        <div className="relative z-10 flex items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap gap-2">
              <RbcBadge variant="info">Brand Studio</RbcBadge>
              <RbcBadge variant="success">Foundation</RbcBadge>
            </div>

            <h3 className="mt-3 text-lg font-black tracking-tight text-[var(--surface-foreground)]">
              Brand kit builder
            </h3>

            <p className="mt-1 text-xs leading-5 text-[var(--theme-text-muted)]">
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
        <div className="rounded-3xl rbc-surface-muted p-4">
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
              <h4 className="truncate text-lg font-black text-[var(--surface-foreground)]">
                {brand.name}
              </h4>
              <p className="mt-1 text-sm leading-5 text-[var(--theme-text-muted)]">
                {brand.slogan}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <div>
            <label
              htmlFor="brand-name"
              className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--theme-text-subtle)]"
            >
              Brand Name
            </label>
            <input
              id="brand-name"
              type="text"
              value={brand.name}
              onChange={(event) => updateBrandName(event.currentTarget.value)}
              className={`mt-1 w-full ${rbcField}`}
            />
          </div>

          <div>
            <label
              htmlFor="brand-slogan"
              className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--theme-text-subtle)]"
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
              className={`mt-1 w-full ${rbcField}`}
            />
          </div>

          <div>
            <label
              htmlFor="brand-logo-text"
              className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--theme-text-subtle)]"
            >
              Logo Text
            </label>
            <input
              id="brand-logo-text"
              type="text"
              value={brand.logoText}
              maxLength={6}
              onChange={(event) => updateLogoText(event.currentTarget.value)}
              className={`mt-1 w-full ${rbcField}`}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--theme-text-subtle)]">
              Palette
            </p>
            <RbcBadge variant="neutral">{brand.palette.length} colors</RbcBadge>
          </div>

          <div className="mt-3 grid gap-3">
            {brand.palette.map((color) => (
              <div
                key={color.id}
                className="rounded-2xl rbc-surface-muted p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor={`brand-color-${color.id}`}
                    className="text-xs font-black uppercase tracking-[0.14em] text-[var(--theme-text-subtle)]"
                  >
                    {color.name}
                  </label>
                  <span className="font-mono text-xs text-[var(--theme-text-muted)]">
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
                    className="size-11 cursor-pointer rounded-2xl border border-[var(--theme-border-soft)] bg-[var(--surface-panel-strong)] p-1 shadow-sm"
                  />

                  <input
                    type="text"
                    value={color.value}
                    aria-label={`${color.name} hex value`}
                    onChange={(event) =>
                      updatePaletteColor(color.id, event.currentTarget.value)
                    }
                    className={`min-w-0 flex-1 font-mono ${rbcField}`}
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
        <TypographySystemPanel />
      </div>
    </section>
  );
}
