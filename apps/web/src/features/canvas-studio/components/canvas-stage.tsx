"use client";

import { useEffect, useRef } from "react";
import type Konva from "konva";
import { Group, Layer, Rect, Stage, Text, Transformer } from "react-konva";
import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcButton } from "@/components/ui/rbc-button";
import { CanvasMiniMap } from "@/features/canvas-studio/components/canvas-mini-map";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";
import { CANVAS_GRID_SIZE } from "@/features/canvas-studio/utils/canvas-grid";

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 520;
const RULER_SIZE = 28;

function isAdditiveSelection(
  event: Konva.KonvaEventObject<MouseEvent | TouchEvent>,
): boolean {
  const nativeEvent = event.evt;

  return "metaKey" in nativeEvent
    ? nativeEvent.metaKey || nativeEvent.ctrlKey
    : false;
}

function CanvasEmptyState() {
  const addRectangle = useCanvasStore((state) => state.addRectangle);
  const addText = useCanvasStore((state) => state.addText);
  const applyTemplate = useCanvasStore((state) => state.applyTemplate);

  return (
    <div className="absolute inset-6 z-20 grid place-items-center rounded-[22px] border border-dashed border-slate-300 bg-white/86 p-6 text-center backdrop-blur-sm dark:border-slate-700 dark:bg-slate-950/82">
      <div className="max-w-md">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[conic-gradient(from_180deg,#4f46e5,#db2777,#06b6d4,#4f46e5)] text-sm font-black text-white shadow-xl shadow-indigo-500/20">
          RBC
        </div>

        <div className="mt-4 flex justify-center gap-2">
          <RbcBadge variant="info">Start here</RbcBadge>
          <RbcBadge variant="success">Canvas ready</RbcBadge>
        </div>

        <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
          Create your first visual layout
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
          Start from a template or add your own rectangle/text nodes. Every
          design action updates live code and JSON export.
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <RbcButton variant="primary" onClick={() => applyTemplate("hero")}>
            Use Hero Template
          </RbcButton>

          <RbcButton
            variant="secondary"
            onClick={() => applyTemplate("pricing-card")}
          >
            Pricing Card
          </RbcButton>

          <RbcButton variant="secondary" onClick={addRectangle}>
            Add Rectangle
          </RbcButton>

          <RbcButton variant="ghost" onClick={addText}>
            Add Text
          </RbcButton>
        </div>
      </div>
    </div>
  );
}

function HorizontalRuler() {
  return (
    <div
      aria-hidden="true"
      className="absolute left-7 right-0 top-0 z-10 flex h-7 border-b border-slate-800 bg-slate-950 text-[10px] font-bold text-slate-500"
    >
      {Array.from({ length: Math.floor(CANVAS_WIDTH / 100) + 1 }).map(
        (_, index) => (
          <div
            key={index}
            className="relative shrink-0 border-l border-slate-800"
            style={{ width: 100 }}
          >
            <span className="absolute left-1 top-1">{index * 100}</span>
          </div>
        ),
      )}
    </div>
  );
}

function VerticalRuler() {
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 top-7 z-10 w-7 border-r border-slate-800 bg-slate-950 text-[10px] font-bold text-slate-500"
    >
      {Array.from({ length: Math.floor(CANVAS_HEIGHT / 100) + 1 }).map(
        (_, index) => (
          <div
            key={index}
            className="relative border-t border-slate-800"
            style={{ height: 100 }}
          >
            <span className="absolute left-1 top-1 origin-left rotate-90">
              {index * 100}
            </span>
          </div>
        ),
      )}
    </div>
  );
}

function SelectionHud() {
  const nodes = useCanvasStore((state) => state.nodes);
  const selectedNodeIds = useCanvasStore((state) => state.selectedNodeIds);
  const duplicateSelectedNodes = useCanvasStore(
    (state) => state.duplicateSelectedNodes,
  );
  const copySelectedNodes = useCanvasStore((state) => state.copySelectedNodes);
  const deleteSelectedNode = useCanvasStore((state) => state.deleteSelectedNode);
  const groupSelectedNodes = useCanvasStore((state) => state.groupSelectedNodes);
  const ungroupSelectedNodes = useCanvasStore(
    (state) => state.ungroupSelectedNodes,
  );

  if (selectedNodeIds.length === 0) {
    return null;
  }

  const selectedNodes = nodes.filter((node) =>
    selectedNodeIds.includes(node.id),
  );

  const firstNode = selectedNodes[0];
  const canGroup = selectedNodeIds.length > 1;
  const canUngroup = selectedNodes.some((node) => node.type === "group");

  return (
    <div className="absolute left-10 top-10 z-30 flex max-w-[calc(100%-5rem)] flex-wrap items-center gap-2 rounded-2xl border border-indigo-300 bg-white/92 px-3 py-2 text-xs font-bold text-slate-700 shadow-2xl backdrop-blur-2xl dark:border-indigo-800 dark:bg-slate-950/92 dark:text-slate-200">
      <span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-black text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:ring-indigo-900">
        {selectedNodeIds.length} selected
      </span>

      {firstNode === undefined ? null : (
        <>
          <span className="text-slate-500">
            {firstNode.type.toUpperCase()}
          </span>
          <span className="hidden text-slate-400 sm:inline">
            {Math.round(firstNode.x)}, {Math.round(firstNode.y)} ·{" "}
            {Math.round(firstNode.width)}×{Math.round(firstNode.height)}
          </span>
        </>
      )}

      <span className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

      <button
        type="button"
        onClick={copySelectedNodes}
        className="rounded-lg px-2 py-1 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-slate-800"
      >
        Copy
      </button>

      <button
        type="button"
        onClick={duplicateSelectedNodes}
        className="rounded-lg px-2 py-1 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-slate-800"
      >
        Duplicate
      </button>

      {canGroup ? (
        <button
          type="button"
          onClick={groupSelectedNodes}
          className="rounded-lg px-2 py-1 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-slate-800"
        >
          Group
        </button>
      ) : null}

      {canUngroup ? (
        <button
          type="button"
          onClick={ungroupSelectedNodes}
          className="rounded-lg px-2 py-1 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-slate-800"
        >
          Ungroup
        </button>
      ) : null}

      <button
        type="button"
        onClick={deleteSelectedNode}
        className="rounded-lg px-2 py-1 text-red-600 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:text-red-300 dark:hover:bg-red-950/50"
      >
        Delete
      </button>
    </div>
  );
}

export function CanvasStage() {
  const nodes = useCanvasStore((state) => state.nodes);
  const selectedNodeIds = useCanvasStore((state) => state.selectedNodeIds);
  const snapToGridEnabled = useCanvasStore((state) => state.snapToGridEnabled);
  const selectNode = useCanvasStore((state) => state.selectNode);
  const clearSelection = useCanvasStore((state) => state.clearSelection);
  const moveNode = useCanvasStore((state) => state.moveNode);
  const resizeNode = useCanvasStore((state) => state.resizeNode);
  const zoom = useCanvasStore((state) => state.zoom);

  const nodeRefs = useRef<Map<string, Konva.Node>>(new Map());
  const transformerRef = useRef<Konva.Transformer | null>(null);

  useEffect(() => {
    const transformer = transformerRef.current;

    if (transformer === null) {
      return;
    }

    const selectedNodes = selectedNodeIds
      .map((nodeId) => nodeRefs.current.get(nodeId))
      .filter((node): node is Konva.Node => node !== undefined);

    transformer.nodes(selectedNodes);
    transformer.getLayer()?.batchDraw();
  }, [selectedNodeIds, nodes]);

  return (
    <div className="overflow-hidden rounded-[32px] border border-slate-800 bg-slate-950 shadow-[0_30px_100px_rgba(15,23,42,0.24)]">
      <div className="flex h-12 flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4">
        <div className="flex items-center gap-3">
          <div className="grid size-7 place-items-center rounded-lg bg-indigo-500 text-[10px] font-black text-white">
            CV
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              Artboard
            </p>
            <h3 className="-mt-0.5 text-sm font-bold text-white">
              Rainbow Canvas
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
          <span className="rounded-full border border-white/10 px-3 py-1">
            {CANVAS_WIDTH} × {CANVAS_HEIGHT}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1">
            {Math.round(zoom * 100)}%
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1">
            Snap {snapToGridEnabled ? "On" : "Off"}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1">
            {selectedNodeIds.length} selected
          </span>
        </div>
      </div>

      <div className="relative h-[680px] overflow-auto bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.2),transparent_34%),linear-gradient(135deg,#111827,#020617)] p-6">
        <SelectionHud />

        <CanvasMiniMap
          nodes={nodes}
          canvasWidth={CANVAS_WIDTH}
          canvasHeight={CANVAS_HEIGHT}
        />

        <div className="relative inline-block min-w-max rounded-[26px] border border-white/10 bg-slate-950 p-7 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
          <div className="absolute left-0 top-0 z-20 size-7 border-b border-r border-slate-800 bg-slate-950" />
          <HorizontalRuler />
          <VerticalRuler />

          <div
            className="relative bg-white p-4"
            style={{
              marginLeft: RULER_SIZE,
              marginTop: RULER_SIZE,
            }}
          >
            {nodes.length === 0 ? <CanvasEmptyState /> : null}

            <Stage
              width={CANVAS_WIDTH * zoom}
              height={CANVAS_HEIGHT * zoom}
              scaleX={zoom}
              scaleY={zoom}
              className="rounded-2xl bg-white shadow-inner"
              onMouseDown={(event) => {
                if (event.target === event.target.getStage()) {
                  clearSelection();
                }
              }}
              onTouchStart={(event) => {
                if (event.target === event.target.getStage()) {
                  clearSelection();
                }
              }}
            >
              <Layer>
                {snapToGridEnabled
                  ? Array.from({
                      length: Math.floor(CANVAS_WIDTH / CANVAS_GRID_SIZE) + 1,
                    }).map((_, index) => (
                      <Rect
                        key={`grid-x-${index}`}
                        x={index * CANVAS_GRID_SIZE}
                        y={0}
                        width={1}
                        height={CANVAS_HEIGHT}
                        fill="rgba(148, 163, 184, 0.16)"
                        listening={false}
                      />
                    ))
                  : null}

                {snapToGridEnabled
                  ? Array.from({
                      length:
                        Math.floor(CANVAS_HEIGHT / CANVAS_GRID_SIZE) + 1,
                    }).map((_, index) => (
                      <Rect
                        key={`grid-y-${index}`}
                        x={0}
                        y={index * CANVAS_GRID_SIZE}
                        width={CANVAS_WIDTH}
                        height={1}
                        fill="rgba(148, 163, 184, 0.16)"
                        listening={false}
                      />
                    ))
                  : null}

                {nodes.map((node) => {
                  const isSelected = selectedNodeIds.includes(node.id);

                  if (node.type === "rectangle") {
                    return (
                      <Rect
                        key={node.id}
                        ref={(shapeNode) => {
                          if (shapeNode === null) {
                            nodeRefs.current.delete(node.id);
                            return;
                          }

                          nodeRefs.current.set(node.id, shapeNode);
                        }}
                        x={node.x}
                        y={node.y}
                        width={node.width}
                        height={node.height}
                        cornerRadius={node.radius}
                        fill={node.fill}
                        stroke={isSelected ? "#4f46e5" : "transparent"}
                        strokeWidth={isSelected ? 2 : 0}
                        shadowColor={isSelected ? "#4f46e5" : undefined}
                        shadowBlur={isSelected ? 10 : 0}
                        shadowOpacity={isSelected ? 0.22 : 0}
                        draggable
                        onClick={(event) =>
                          selectNode(node.id, isAdditiveSelection(event))
                        }
                        onTap={(event) =>
                          selectNode(node.id, isAdditiveSelection(event))
                        }
                        onDragEnd={(event) =>
                          moveNode(node.id, {
                            x: event.target.x(),
                            y: event.target.y(),
                          })
                        }
                        onTransformEnd={(event) => {
                          const shape = event.target;
                          const scaleX = shape.scaleX();
                          const scaleY = shape.scaleY();

                          shape.scaleX(1);
                          shape.scaleY(1);

                          resizeNode(node.id, {
                            width: node.width * scaleX,
                            height: node.height * scaleY,
                          });

                          moveNode(node.id, {
                            x: shape.x(),
                            y: shape.y(),
                          });
                        }}
                      />
                    );
                  }

                  if (node.type === "text") {
                    return (
                      <Text
                        key={node.id}
                        ref={(shapeNode) => {
                          if (shapeNode === null) {
                            nodeRefs.current.delete(node.id);
                            return;
                          }

                          nodeRefs.current.set(node.id, shapeNode);
                        }}
                        x={node.x}
                        y={node.y}
                        width={node.width}
                        height={node.height}
                        text={node.text}
                        fontSize={node.fontSize}
                        fill={node.fill}
                        padding={8}
                        stroke={isSelected ? "#4f46e5" : "transparent"}
                        strokeWidth={isSelected ? 1 : 0}
                        shadowColor={isSelected ? "#4f46e5" : undefined}
                        shadowBlur={isSelected ? 8 : 0}
                        shadowOpacity={isSelected ? 0.18 : 0}
                        draggable
                        onClick={(event) =>
                          selectNode(node.id, isAdditiveSelection(event))
                        }
                        onTap={(event) =>
                          selectNode(node.id, isAdditiveSelection(event))
                        }
                        onDragEnd={(event) =>
                          moveNode(node.id, {
                            x: event.target.x(),
                            y: event.target.y(),
                          })
                        }
                        onTransformEnd={(event) => {
                          const shape = event.target;
                          const scaleX = shape.scaleX();
                          const scaleY = shape.scaleY();

                          shape.scaleX(1);
                          shape.scaleY(1);

                          resizeNode(node.id, {
                            width: node.width * scaleX,
                            height: node.height * scaleY,
                          });

                          moveNode(node.id, {
                            x: shape.x(),
                            y: shape.y(),
                          });
                        }}
                      />
                    );
                  }

                  return (
                    <Group
                      key={node.id}
                      ref={(shapeNode) => {
                        if (shapeNode === null) {
                          nodeRefs.current.delete(node.id);
                          return;
                        }

                        nodeRefs.current.set(node.id, shapeNode);
                      }}
                      x={node.x}
                      y={node.y}
                      width={node.width}
                      height={node.height}
                      draggable
                      onClick={(event) =>
                        selectNode(node.id, isAdditiveSelection(event))
                      }
                      onTap={(event) =>
                        selectNode(node.id, isAdditiveSelection(event))
                      }
                      onDragEnd={(event) =>
                        moveNode(node.id, {
                          x: event.target.x(),
                          y: event.target.y(),
                        })
                      }
                      onTransformEnd={(event) => {
                        const shape = event.target;
                        const scaleX = shape.scaleX();
                        const scaleY = shape.scaleY();

                        shape.scaleX(1);
                        shape.scaleY(1);

                        resizeNode(node.id, {
                          width: node.width * scaleX,
                          height: node.height * scaleY,
                        });

                        moveNode(node.id, {
                          x: shape.x(),
                          y: shape.y(),
                        });
                      }}
                    >
                      <Rect
                        x={0}
                        y={0}
                        width={node.width}
                        height={node.height}
                        fill="transparent"
                        stroke={isSelected ? "#4f46e5" : "#94a3b8"}
                        dash={[8, 6]}
                        strokeWidth={isSelected ? 2 : 1}
                      />
                    </Group>
                  );
                })}

                <Transformer
                  ref={transformerRef}
                  rotateEnabled={false}
                  enabledAnchors={[
                    "top-left",
                    "top-right",
                    "bottom-left",
                    "bottom-right",
                    "middle-left",
                    "middle-right",
                  ]}
                  anchorFill="#ffffff"
                  anchorStroke="#4f46e5"
                  anchorSize={10}
                  borderStroke="#4f46e5"
                  borderDash={[4, 4]}
                  boundBoxFunc={(oldBox, newBox) => {
                    if (newBox.width < 24 || newBox.height < 24) {
                      return oldBox;
                    }

                    return newBox;
                  }}
                />
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    </div>
  );
}