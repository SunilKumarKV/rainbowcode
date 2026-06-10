"use client";

import { useRef, useState } from "react";
import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcButton } from "@/components/ui/rbc-button";
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
      className="space-y-5 rounded-[34px] border border-white/70 bg-white/58 p-4 shadow-[0_24px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/58"
    >
      <div className="overflow-hidden rounded-[30px] border border-white/70 bg-slate-950 text-white shadow-[0_24px_90px_rgba(15,23,42,0.18)] dark:border-white/10">
        <div className="relative overflow-hidden p-5 sm:p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.45),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.28),transparent_32%)]" />

          <div className="relative z-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2">
                <RbcBadge variant="info">Canvas Studio</RbcBadge>
                <RbcBadge variant="success">V1 Editor</RbcBadge>
                <RbcBadge variant="neutral">Design-to-Code</RbcBadge>
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-5xl">
                Build layouts like a designer. Export like an engineer.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Create responsive visual compositions with nodes, groups,
                templates, snap grid, keyboard workflows, JSON import/export,
                and generated React/Tailwind output.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <RbcButton
                variant="ghost"
                onClick={openImportDialog}
                className="border border-white/10 text-white hover:bg-white/10"
              >
                Import JSON
              </RbcButton>

              <RbcButton
                variant="ghost"
                onClick={exportCanvasJsonFile}
                className="border border-white/10 text-white hover:bg-white/10"
              >
                Export JSON
              </RbcButton>

              <RbcButton variant="primary" onClick={exportCanvasCode}>
                Export TSX
              </RbcButton>
            </div>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        onChange={(event) => void importCanvasJsonFile(event)}
        className="hidden"
        aria-label="Import canvas JSON file"
      />

      {importError === null ? null : (
        <div
          role="alert"
          className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
        >
          {importError}
        </div>
      )}

      <CanvasToolbar />

      <div className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          <CanvasStatusPanel />
          <CanvasStage />
        </div>

        <div className="space-y-5">
          <CanvasLayersPanel />
          <CanvasPropertiesPanel />
        </div>
      </div>

      <section
        aria-label="Generated canvas code"
        className="overflow-hidden rounded-[30px] border border-white/10 bg-slate-950 text-white shadow-[0_24px_90px_rgba(15,23,42,0.18)]"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-5 py-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold">Generated Canvas Code</h3>
              <RbcBadge variant="info">React / Tailwind</RbcBadge>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              Export filenames: rainbow-canvas.tsx, rainbow-canvas.json
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <RbcButton
              variant="ghost"
              onClick={copyCanvasCode}
              className="border border-white/10 text-white hover:bg-white/10"
            >
              Copy Code
            </RbcButton>

            <RbcButton variant="primary" onClick={exportCanvasCode}>
              Export TSX
            </RbcButton>
          </div>
        </div>

        <pre className="max-h-80 overflow-auto p-5 text-sm leading-6 text-slate-100">
          <code>{generatedCanvasCode}</code>
        </pre>
      </section>
    </section>
  );
}