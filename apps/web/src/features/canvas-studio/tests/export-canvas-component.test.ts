import { describe, expect, it } from "vitest";
import { exportCanvasComponent } from "@/features/canvas-studio/exporters/export-canvas-component";
import type { CanvasNode } from "@/features/canvas-studio/types/canvas-node";

const nodes: readonly CanvasNode[] = [
  {
    id: "rectangle-1",
    type: "rectangle",
    x: 10,
    y: 20,
    width: 180,
    height: 100,
    fill: "var(--color-primary)",
    radius: 16,
  },
];

describe("exportCanvasComponent", () => {
  it("exports a React canvas component string", () => {
    const output = exportCanvasComponent(nodes);

    expect(output).toContain("export function RainbowCanvas()");
    expect(output).toContain("<section");
    expect(output).toContain('left: "10px"');
    expect(output).toContain('background: "var(--color-primary)"');
  });
});