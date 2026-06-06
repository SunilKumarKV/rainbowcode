"use client";

import { useEffect, useRef } from "react";
import { Layer, Rect, Stage, Text, Transformer } from "react-konva";
import type Konva from "konva";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 520;

export function CanvasStage() {
  const nodes = useCanvasStore((state) => state.nodes);
  const selectedNodeId = useCanvasStore((state) => state.selectedNodeId);
  const selectNode = useCanvasStore((state) => state.selectNode);
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

    if (selectedNodeId === null) {
      transformer.nodes([]);
      transformer.getLayer()?.batchDraw();
      return;
    }

    const selectedNode = nodeRefs.current.get(selectedNodeId);

    if (selectedNode === undefined) {
      transformer.nodes([]);
      transformer.getLayer()?.batchDraw();
      return;
    }

    transformer.nodes([selectedNode]);
    transformer.getLayer()?.batchDraw();
  }, [selectedNodeId, nodes]);

  return (
    <div className="overflow-auto rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      <Stage
        width={CANVAS_WIDTH * zoom}
        height={CANVAS_HEIGHT * zoom}
        scaleX={zoom}
        scaleY={zoom}
        className="rounded-2xl bg-white shadow-sm dark:bg-slate-950"
        onMouseDown={(event) => {
          if (event.target === event.target.getStage()) {
            selectNode(null);
          }
        }}
        onTouchStart={(event) => {
          if (event.target === event.target.getStage()) {
            selectNode(null);
          }
        }}
      >
        <Layer>
          {nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;

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
                  stroke={isSelected ? "#0f172a" : "transparent"}
                  strokeWidth={isSelected ? 2 : 0}
                  draggable
                  onClick={() => selectNode(node.id)}
                  onTap={() => selectNode(node.id)}
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
                stroke={isSelected ? "#0f172a" : "transparent"}
                strokeWidth={isSelected ? 1 : 0}
                draggable
                onClick={() => selectNode(node.id)}
                onTap={() => selectNode(node.id)}
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
            boundBoxFunc={(_oldBox, newBox) => {
              if (newBox.width < 24 || newBox.height < 24) {
                return _oldBox;
              }

              return newBox;
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
}