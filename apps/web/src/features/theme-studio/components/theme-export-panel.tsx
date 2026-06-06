"use client";

import { exportCssTheme } from "@/features/theme-engine/exporters/export-css";
import { exportJsonTheme } from "@/features/theme-engine/exporters/export-json";
import { exportTailwindTheme } from "@/features/theme-engine/exporters/export-tailwind";
import { downloadFile } from "@/features/theme-engine/exporters/download-file";
import { useThemeStore } from "@/features/theme-engine/store/theme-store";
import { ThemeExportPanel } from "@/features/theme-studio/components/theme-export-panel";

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
    <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
      <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
        Export Theme
      </h3>
      <p className="mt-1 text-xs leading-5 text-slate-500">
        Download generated tokens for production projects.
      </p>

      <div className="mt-4 grid gap-2">
        <button
          type="button"
          onClick={handleExportCss}
          className="rounded-xl border border-slate-200 px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          Export CSS Variables
        </button>

        <button
          type="button"
          onClick={handleExportJson}
          className="rounded-xl border border-slate-200 px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          Export JSON Tokens
        </button>

        <button
          type="button"
          onClick={handleExportTailwind}
          className="rounded-xl border border-slate-200 px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          Export Tailwind Theme
        </button>
        <ThemeExportPanel />
      </div>
    </section>
  );
}