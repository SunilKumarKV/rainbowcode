"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcButton } from "@/components/ui/rbc-button";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";
import type { CanvasNode } from "@/features/canvas-studio/types/canvas-node";

function toNumber(value: string): number {
  const parsed = Number.parseFloat(value);

  return Number.isFinite(parsed) ? parsed : 0;
}

type NumberFieldProps = {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly min?: number;
  readonly onChange: (value: number) => void;
};

function NumberField({ id, label, value, min, onChange }: NumberFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500"
      >
        {label}
      </label>
      <input
        id={id}
        type="number"
        min={min}
        value={Math.round(value)}
        onChange={(event) => onChange(toNumber(event.currentTarget.value))}
        className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
      />
    </div>
  );
}

type CanvasPropertiesFieldsProps = {
  readonly node: CanvasNode;
};

function CanvasPropertiesFields({ node }: CanvasPropertiesFieldsProps) {
  const updateNode = useCanvasStore((state) => state.updateNode);

  if (node.type === "group") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            id="canvas-group-x"
            label="X"
            value={node.x}
            onChange={(value) => updateNode(node.id, { x: value })}
          />

          <NumberField
            id="canvas-group-y"
            label="Y"
            value={node.y}
            onChange={(value) => updateNode(node.id, { y: value })}
          />

          <NumberField
            id="canvas-group-width"
            label="Width"
            value={node.width}
            min={24}
            onChange={(value) => updateNode(node.id, { width: value })}
          />

          <NumberField
            id="canvas-group-height"
            label="Height"
            value={node.height}
            min={24}
            onChange={(value) => updateNode(node.id, { height: value })}
          />
        </div>

        <div className="rounded-3xl border border-dashed border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300">
          Group contains <strong>{node.childNodeIds.length}</strong> child
          nodes. Moving or resizing this group updates child nodes together.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <NumberField
          id="canvas-node-x"
          label="X"
          value={node.x}
          onChange={(value) => updateNode(node.id, { x: value })}
        />

        <NumberField
          id="canvas-node-y"
          label="Y"
          value={node.y}
          onChange={(value) => updateNode(node.id, { y: value })}
        />

        <NumberField
          id="canvas-node-width"
          label="Width"
          value={node.width}
          min={24}
          onChange={(value) => updateNode(node.id, { width: value })}
        />

        <NumberField
          id="canvas-node-height"
          label="Height"
          value={node.height}
          min={24}
          onChange={(value) => updateNode(node.id, { height: value })}
        />
      </div>

      <div>
        <label
          htmlFor="canvas-node-fill"
          className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500"
        >
          Fill / Color
        </label>
        <input
          id="canvas-node-fill"
          type="text"
          value={node.fill}
          onChange={(event) =>
            updateNode(node.id, { fill: event.currentTarget.value })
          }
          className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
        />
      </div>

      {node.type === "rectangle" ? (
        <NumberField
          id="canvas-node-radius"
          label="Radius"
          value={node.radius}
          min={0}
          onChange={(value) => updateNode(node.id, { radius: value })}
        />
      ) : null}

      {node.type === "text" ? (
        <>
          <div>
            <label
              htmlFor="canvas-node-text"
              className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500"
            >
              Text
            </label>
            <input
              id="canvas-node-text"
              type="text"
              value={node.text}
              onChange={(event) =>
                updateNode(node.id, { text: event.currentTarget.value })
              }
              className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <NumberField
            id="canvas-node-font-size"
            label="Font Size"
            value={node.fontSize}
            min={8}
            onChange={(value) => updateNode(node.id, { fontSize: value })}
          />
        </>
      ) : null}
    </div>
  );
}

function PropertiesEmptyState() {
  const addRectangle = useCanvasStore((state) => state.addRectangle);
  const applyTemplate = useCanvasStore((state) => state.applyTemplate);

  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mx-auto grid size-10 place-items-center rounded-2xl bg-white text-lg shadow-sm dark:bg-slate-950">
        ⚙
      </div>

      <h3 className="mt-3 text-sm font-black text-slate-950 dark:text-white">
        Nothing selected
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        Select a layer or canvas object to edit size, position, color, text, or
        group behavior.
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <RbcButton variant="primary" onClick={addRectangle}>
          Add Node
        </RbcButton>
        <RbcButton variant="secondary" onClick={() => applyTemplate("hero")}>
          Use Template
        </RbcButton>
      </div>
    </div>
  );
}

export function CanvasPropertiesPanel() {
  const nodes = useCanvasStore((state) => state.nodes);
  const selectedNodeIds = useCanvasStore((state) => state.selectedNodeIds);
  const duplicateSelectedNodes = useCanvasStore(
    (state) => state.duplicateSelectedNodes,
  );
  const copySelectedNodes = useCanvasStore((state) => state.copySelectedNodes);
  const deleteSelectedNode = useCanvasStore((state) => state.deleteSelectedNode);

  if (selectedNodeIds.length > 1) {
    return (
      <aside
        aria-label="Canvas properties"
        className="overflow-hidden rounded-[28px] border border-white/70 bg-white/78 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/76"
      >
        <div className="border-b border-slate-200/70 px-4 py-4 dark:border-slate-800">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
            Inspector
          </p>
          <h3 className="mt-1 text-sm font-black text-slate-950 dark:text-white">
            Multi Selection
          </h3>
        </div>

        <div className="p-4">
          <div className="rounded-3xl border border-dashed border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300">
            <strong>{selectedNodeIds.length}</strong> nodes selected. Use group,
            duplicate, copy, or layer actions from the toolbar.
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={copySelectedNodes}
              className="h-9 rounded-xl border border-slate-200 bg-white text-xs font-black text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
            >
              Copy
            </button>
            <button
              type="button"
              onClick={duplicateSelectedNodes}
              className="h-9 rounded-xl border border-slate-200 bg-white text-xs font-black text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
            >
              Duplicate
            </button>
            <button
              type="button"
              onClick={deleteSelectedNode}
              className="h-9 rounded-xl border border-red-200 bg-red-50 text-xs font-black text-red-700 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
            >
              Delete
            </button>
          </div>
        </div>
      </aside>
    );
  }

  const selectedNode =
    selectedNodeIds.length === 0
      ? undefined
      : nodes.find((node) => node.id === selectedNodeIds[0]);

  return (
    <aside
      aria-label="Canvas properties"
      className="overflow-hidden rounded-[28px] border border-white/70 bg-white/78 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/76"
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 px-4 py-4 dark:border-slate-800">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
            Inspector
          </p>
          <h3 className="mt-1 text-sm font-black text-slate-950 dark:text-white">
            Properties
          </h3>
        </div>

        <RbcBadge variant={selectedNode === undefined ? "neutral" : "info"}>
          {selectedNode === undefined ? "Idle" : selectedNode.type}
        </RbcBadge>
      </div>

      <div className="p-4">
        {selectedNode === undefined ? (
          <PropertiesEmptyState />
        ) : (
          <>
            <div className="mb-4 rounded-3xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">Selected object</p>
                  <p className="mt-1 truncate text-sm font-black text-slate-950 dark:text-white">
                    {selectedNode.id}
                  </p>
                </div>

                <span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-black text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:ring-indigo-900">
                  {selectedNode.type}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={copySelectedNodes}
                  className="h-8 rounded-lg bg-white text-[10px] font-black text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:bg-slate-950 dark:text-slate-300 dark:ring-slate-800"
                >
                  Copy
                </button>
                <button
                  type="button"
                  onClick={duplicateSelectedNodes}
                  className="h-8 rounded-lg bg-white text-[10px] font-black text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:bg-slate-950 dark:text-slate-300 dark:ring-slate-800"
                >
                  Duplicate
                </button>
                <button
                  type="button"
                  onClick={deleteSelectedNode}
                  className="h-8 rounded-lg bg-red-50 text-[10px] font-black text-red-600 ring-1 ring-red-200 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:bg-red-950 dark:text-red-300 dark:ring-red-900"
                >
                  Delete
                </button>
              </div>
            </div>

            <CanvasPropertiesFields node={selectedNode} />
          </>
        )}
      </div>
    </aside>
  );
}