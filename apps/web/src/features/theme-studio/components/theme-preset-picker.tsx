"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
import { themePresets, type ThemePresetId } from "@/features/theme-engine/presets/theme-presets";

type ThemePresetPickerProps = {
  readonly activePresetId: ThemePresetId | "custom";
  readonly onSelectPreset: (presetId: ThemePresetId) => void;
};

export function ThemePresetPicker({
  activePresetId,
  onSelectPreset,
}: ThemePresetPickerProps) {
  return (
    <section className="overflow-hidden rounded-[28px] rbc-surface-card">
      <div className="border-b border-[var(--theme-border-soft)] px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-primary)]">
              Presets
            </p>
            <h3 className="mt-1 text-sm font-black text-[var(--surface-foreground)]">
              Theme starting points
            </h3>
          </div>

          <RbcBadge variant={activePresetId === "custom" ? "neutral" : "success"}>
            {activePresetId === "custom" ? "Custom" : "Preset active"}
          </RbcBadge>
        </div>

        <p className="mt-2 text-xs leading-5 text-[var(--theme-text-muted)]">
          Apply a production-ready visual system, then tune tokens without leaving
          the studio.
        </p>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
        {themePresets.map((preset) => {
          const active = activePresetId === preset.id;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset.id)}
              className={`rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-focus-ring)] ${
                active
                  ? "border-[var(--color-primary)] bg-[var(--surface-accent-soft)] shadow-[var(--shadow-soft)]"
                  : "border-[var(--theme-border-soft)] rbc-surface-muted hover:bg-[var(--surface-panel-strong)]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-[var(--surface-foreground)]">
                    {preset.label}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[var(--theme-text-muted)]">
                    {preset.description}
                  </p>
                </div>

                {active ? <RbcBadge variant="info">Live</RbcBadge> : null}
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2">
                {Object.values(preset.theme.colors).slice(0, 4).map((color) => (
                  <span
                    key={`${preset.id}-${color}`}
                    aria-hidden="true"
                    className="h-10 rounded-xl border border-[var(--theme-border-soft)]"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
