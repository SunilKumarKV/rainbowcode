"use client";

import type { ChangeEvent } from "react";
import { useRef, useState } from "react";
import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcButton } from "@/components/ui/rbc-button";
import { downloadFile } from "@/features/theme-engine/exporters/download-file";
import { exportCssTheme } from "@/features/theme-engine/exporters/export-css";
import { exportJsonTheme } from "@/features/theme-engine/exporters/export-json";
import { exportTailwindTheme } from "@/features/theme-engine/exporters/export-tailwind";
import { importThemeJson } from "@/features/theme-engine/importers/import-theme-json";
import { useThemeStore } from "@/features/theme-engine/store/theme-store";

export function ThemeExportPanel() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [importState, setImportState] = useState<{
    readonly tone: "idle" | "success" | "error";
    readonly message: string;
  }>({
    tone: "idle",
    message: "Validated theme.json imports apply directly to the live runtime.",
  });

  function handleExportCss(): void {
    downloadFile("theme.css", exportCssTheme(theme), "text/css");
  }

  function handleExportJson(): void {
    downloadFile("theme.json", exportJsonTheme(theme), "application/json");
  }

  function handleExportTailwind(): void {
    downloadFile(
      "tailwind.tokens.ts",
      exportTailwindTheme(theme),
      "text/typescript",
    );
  }

  async function handleImportTheme(
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    const file = event.currentTarget.files?.[0];

    if (file === undefined) {
      return;
    }

    try {
      const importedTheme = importThemeJson(await file.text());
      setTheme(importedTheme);
      setImportState({
        tone: "success",
        message: `${file.name} imported successfully and applied to the live runtime.`,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to import theme.json.";

      setImportState({
        tone: "error",
        message,
      });
    } finally {
      event.currentTarget.value = "";
    }
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
          Import validated theme JSON or export production tokens for CSS, JSON,
          and Tailwind.
        </p>
      </div>

      <div className="grid gap-2 p-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(event) => {
            void handleImportTheme(event);
          }}
        />

        <RbcButton
          variant="secondary"
          onClick={() => fileInputRef.current?.click()}
        >
          Import theme.json
        </RbcButton>

        <RbcButton variant="secondary" onClick={handleExportCss}>
          Export theme.css
        </RbcButton>

        <RbcButton variant="secondary" onClick={handleExportJson}>
          Export theme.json
        </RbcButton>

        <RbcButton variant="primary" onClick={handleExportTailwind}>
          Export tailwind.tokens.ts
        </RbcButton>

        <div
          className={`rounded-2xl border px-3 py-3 text-xs leading-5 ${
            importState.tone === "error"
              ? "border-[var(--color-destructive)] bg-[var(--surface-danger-soft)] text-[var(--color-destructive)]"
              : importState.tone === "success"
                ? "border-[var(--color-success)] bg-[var(--surface-success-soft)] text-[var(--color-success)]"
                : "border-[var(--theme-border-soft)] rbc-surface-muted text-[var(--theme-text-muted)]"
          }`}
        >
          {importState.message}
        </div>
      </div>
    </section>
  );
}
