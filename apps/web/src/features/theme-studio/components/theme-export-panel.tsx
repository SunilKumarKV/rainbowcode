"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcButton } from "@/components/ui/rbc-button";
import { downloadFile } from "@/features/theme-engine/exporters/download-file";
import { exportCssTheme } from "@/features/theme-engine/exporters/export-css";
import { exportJsonTheme } from "@/features/theme-engine/exporters/export-json";
import { exportTailwindTheme } from "@/features/theme-engine/exporters/export-tailwind";
import { useThemeStore } from "@/features/theme-engine/store/theme-store";

export function ThemeExportPanel() {
  const theme = useThemeStore((state) => state.theme);

  function handleExportCss(): void {
    downloadFile("rainbowcode-theme.css", exportCssTheme(theme), "text/css");
  }

  function handleExportJson(): void {
    downloadFile(
      "rainbowcode-theme.json",
      exportJsonTheme(theme),
      "application/json",
    );
  }

  function handleExportTailwind(): void {
    downloadFile(
      "rainbowcode-tailwind-theme.json",
      exportTailwindTheme(theme),
      "application/json",
    );
  }

  return (
    <section className="overflow-hidden rounded-[28px] rbc-surface-card">
      <div className="border-b border-[var(--theme-border-soft)] px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-primary)]">
              Export
            </p>
            <h3 className="mt-1 text-sm font-black text-[var(--surface-foreground)]">
              Theme Output
            </h3>
          </div>

          <RbcBadge variant="info">Ready</RbcBadge>
        </div>

        <p className="mt-2 text-xs leading-5 text-[var(--theme-text-muted)]">
          Export production tokens for CSS, JSON, and Tailwind.
        </p>
      </div>

      <div className="grid gap-2 p-4">
        <RbcButton variant="secondary" onClick={handleExportCss}>
          Export CSS Variables
        </RbcButton>

        <RbcButton variant="secondary" onClick={handleExportJson}>
          Export JSON Tokens
        </RbcButton>

        <RbcButton variant="primary" onClick={handleExportTailwind}>
          Export Tailwind Theme
        </RbcButton>
      </div>
    </section>
  );
}
