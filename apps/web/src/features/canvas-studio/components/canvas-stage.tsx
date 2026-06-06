"use client";

import { Layer, Rect, Stage, Text } from "react-konva";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 520;

export function CanvasStage() {
  const nodes = useCanvasStore((state) => state.nodes);
  const selectedNodeId = useCanvasStore((state) => state.selectedNodeId);
  const selectNode = useCanvasStore((state) => state.selectNode);
  const moveNode = useCanvasStore((state) => state.moveNode);

  return (
    <div className="overflow-auto rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      <Stage
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
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
                />
              );
            }

            return (
              <Text
                key={node.id}
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
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
}