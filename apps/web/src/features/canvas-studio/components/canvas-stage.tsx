"use client";

import { useEffect, useRef } from "react";
import type Konva from "konva";
import { Group, Layer, Rect, Stage, Text, Transformer } from "react-konva";
import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcButton } from "@/components/ui/rbc-button";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";
import { CANVAS_GRID_SIZE } from "@/features/canvas-studio/utils/canvas-grid";

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 520;

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
    <div className="absolute inset-6 z-20 grid place-items-center rounded-[22px] border border-dashed border-slate-300 bg-white/82 p-6 text-center backdrop-blur-sm dark:border-slate-700 dark:bg-slate-950/78">
      <div className="max-w-md">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[conic-gradient(from_180deg,#ff0080,#7928ca,#2afadf,#ff0080)] text-sm font-black text-white shadow-xl shadow-indigo-500/20">
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
    <div className="rounded-[32px] border border-white/70 bg-slate-950 p-3 shadow-[0_30px_100px_rgba(15,23,42,0.20)] dark:border-white/10">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-3 pb-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Artboard
          </p>
          <h3 className="mt-1 text-sm font-bold text-white">
            Rainbow Canvas / 900 × 520
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
          <span className="rounded-full border border-white/10 px-3 py-1">
            {Math.round(zoom * 100)}%
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1">
            Snap {snapToGridEnabled ? "On" : "Off"}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1">
            {nodes.length} nodes
          </span>
        </div>
      </div>

      <div className="mt-3 overflow-auto rounded-[24px] bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_36%),linear-gradient(135deg,#0f172a,#020617)] p-6">
        <div className="relative inline-block rounded-[24px] bg-white p-4 shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
          {nodes.length === 0 ? <CanvasEmptyState /> : null}

          <Stage
            width={CANVAS_WIDTH * zoom}
            height={CANVAS_HEIGHT * zoom}
            scaleX={zoom}
            scaleY={zoom}
            className="rounded-2xl bg-white"
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
                    length: Math.floor(CANVAS_HEIGHT / CANVAS_GRID_SIZE) + 1,
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
  );
}