"use client";

import type { CanvasNode } from "@/features/canvas-studio/types/canvas-node";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";

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
        className="text-xs font-medium text-slate-600 dark:text-slate-400"
      >
        {label}
      </label>
      <input
        id={id}
        type="number"
        min={min}
        value={Math.round(value)}
        onChange={(event) => onChange(toNumber(event.currentTarget.value))}
        className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none focus:bg-white focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700"
      />
    </div>
  );
}

type CanvasPropertiesFieldsProps = {
  readonly node: CanvasNode;
};

function CanvasPropertiesFields({ node }: CanvasPropertiesFieldsProps) {
  const updateNode = useCanvasStore((state) => state.updateNode);

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
          className="text-xs font-medium text-slate-600 dark:text-slate-400"
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
          className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none focus:bg-white focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700"
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
              className="text-xs font-medium text-slate-600 dark:text-slate-400"
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
              className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none focus:bg-white focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700"
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

export function CanvasPropertiesPanel() {
  const nodes = useCanvasStore((state) => state.nodes);
  const selectedNodeId = useCanvasStore((state) => state.selectedNodeId);

  const selectedNode =
    selectedNodeId === null
      ? undefined
      : nodes.find((node) => node.id === selectedNodeId);

  return (
    <aside
      aria-label="Canvas properties"
      className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Properties
        </p>
        <h3 className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">
          Selected Node
        </h3>
      </div>

      {selectedNode === undefined ? (
        <div className="mt-4 rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500 dark:border-slate-800">
          Select a canvas node to edit its properties.
        </div>
      ) : (
        <div className="mt-4">
          <div className="mb-4 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500 dark:bg-slate-900">
            Type: {selectedNode.type}
          </div>

          <CanvasPropertiesFields node={selectedNode} />
        </div>
      )}
    </aside>
  );
}