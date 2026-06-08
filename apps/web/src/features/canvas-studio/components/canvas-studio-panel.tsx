"use client";

import { CanvasLayersPanel } from "@/features/canvas-studio/components/canvas-layers-panel";
import { CanvasPropertiesPanel } from "@/features/canvas-studio/components/canvas-properties-panel";
import { CanvasStage } from "@/features/canvas-studio/components/canvas-stage";
import { CanvasToolbar } from "@/features/canvas-studio/components/canvas-toolbar";
import { exportCanvasComponent } from "@/features/canvas-studio/exporters/export-canvas-component";
import { generateCanvasCode } from "@/features/canvas-studio/generators/canvas-code-generator";
import { useCanvasKeyboardShortcuts } from "@/features/canvas-studio/hooks/use-canvas-keyboard-shortcuts";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";
import { downloadFile } from "@/features/theme-engine/exporters/download-file";

export function CanvasStudioPanel() {
  useCanvasKeyboardShortcuts();

  const nodes = useCanvasStore((state) => state.nodes);
  const selectedNodeIds = useCanvasStore((state) => state.selectedNodeIds);
  const zoom = useCanvasStore((state) => state.zoom);

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

  return (
    <section
      aria-label="Canvas Studio"
      className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
    >
      <CanvasToolbar />

      <div className="grid gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-400 md:grid-cols-3">
        <span>Nodes: {nodes.length}</span>
        <span>Selected: {selectedNodeIds.length}</span>
        <span>Zoom: {Math.round(zoom * 100)}%</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-3 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950">
        Shortcuts: Delete remove selected, Cmd/Ctrl + D duplicate selected, Esc
        clear selection, Cmd/Ctrl + Click multi-select. Group requires two or
        more selected nodes. Ungroup requires a selected group.
      </div>

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
              Export filename: rainbow-canvas.tsx
            </p>
          </div>

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
          </div>
        </div>

        <pre className="max-h-72 overflow-auto p-4 text-sm leading-6 text-slate-100">
          <code>{generatedCanvasCode}</code>
        </pre>
      </section>
    </section>
  );
}