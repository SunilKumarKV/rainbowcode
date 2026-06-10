"use client";

import { useRef, useState } from "react";
import { CanvasLayersPanel } from "@/features/canvas-studio/components/canvas-layers-panel";
import { CanvasPropertiesPanel } from "@/features/canvas-studio/components/canvas-properties-panel";
import { CanvasStage } from "@/features/canvas-studio/components/canvas-stage";
import { CanvasStatusPanel } from "@/features/canvas-studio/components/canvas-status-panel";
import { CanvasToolbar } from "@/features/canvas-studio/components/canvas-toolbar";
import { exportCanvasComponent } from "@/features/canvas-studio/exporters/export-canvas-component";
import { exportCanvasJson } from "@/features/canvas-studio/exporters/export-canvas-json";
import { generateCanvasCode } from "@/features/canvas-studio/generators/canvas-code-generator";
import { useCanvasKeyboardShortcuts } from "@/features/canvas-studio/hooks/use-canvas-keyboard-shortcuts";
import { importCanvasJson } from "@/features/canvas-studio/importers/import-canvas-json";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";
import { downloadFile } from "@/features/theme-engine/exporters/download-file";

export function CanvasStudioPanel() {
  useCanvasKeyboardShortcuts();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [importError, setImportError] = useState<string | null>(null);

  const nodes = useCanvasStore((state) => state.nodes);
  const importNodes = useCanvasStore((state) => state.importNodes);

  const generatedCanvasCode = generateCanvasCode(nodes);

  async function copyCanvasCode(): Promise<void> {
    await navigator.clipboard.writeText(generatedCanvasCode);
  }

  function exportCanvasCode(): void {
    downloadFile(
      "rainbow-canvas.tsx",
      exportCanvasComponent(nodes),
      "text/typescript",
    );
  }

  function exportCanvasJsonFile(): void {
    downloadFile(
      "rainbow-canvas.json",
      exportCanvasJson(nodes),
      "application/json",
    );
  }

  function openImportDialog(): void {
    setImportError(null);
    fileInputRef.current?.click();
  }

  async function importCanvasJsonFile(
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    const file = event.currentTarget.files?.[0];

    event.currentTarget.value = "";

    if (file === undefined) {
      return;
    }

    try {
      const text = await file.text();
      const importedNodes = importCanvasJson(text);

      importNodes(importedNodes);
      setImportError(null);
    } catch (error) {
      setImportError(
        error instanceof Error ? error.message : "Canvas import failed.",
      );
    }
  }

  return (
    <section
      aria-label="Canvas Studio"
      className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
    >
      <CanvasToolbar />

      <CanvasStatusPanel />

      <div className="rounded-2xl border border-slate-200 bg-white p-3 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950">
        Shortcuts: Delete remove selected, Cmd/Ctrl + D duplicate selected,
        Cmd/Ctrl + C copy, Cmd/Ctrl + V paste, Cmd/Ctrl + Z undo, Cmd/Ctrl +
        Shift + Z redo, Esc clear selection, Cmd/Ctrl + Click multi-select.
      </div>

      {importError === null ? null : (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
        >
          {importError}
        </div>
      )}

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
        <CanvasStage />

        <div className="space-y-4">
          <CanvasLayersPanel />
          <CanvasPropertiesPanel />
        </div>
      </div>

      <section
        aria-label="Generated canvas code"
        className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 text-white dark:border-slate-800"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">
          <div>
            <h3 className="text-sm font-semibold">Generated Canvas Code</h3>
            <p className="text-xs text-slate-400">
              Export filenames: rainbow-canvas.tsx, rainbow-canvas.json
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            onChange={(event) => void importCanvasJsonFile(event)}
            className="hidden"
            aria-label="Import canvas JSON file"
          />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copyCanvasCode}
              className="rounded-xl border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              Copy Canvas Code
            </button>

            <button
              type="button"
              onClick={exportCanvasCode}
              className="rounded-xl border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              Export Canvas
            </button>

            <button
              type="button"
              onClick={exportCanvasJsonFile}
              className="rounded-xl border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              Export JSON
            </button>

            <button
              type="button"
              onClick={openImportDialog}
              className="rounded-xl border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              Import JSON
            </button>
          </div>
        </div>

        <pre className="max-h-72 overflow-auto p-4 text-sm leading-6 text-slate-100">
          <code>{generatedCanvasCode}</code>
        </pre>
      </section>
    </section>
  );
}