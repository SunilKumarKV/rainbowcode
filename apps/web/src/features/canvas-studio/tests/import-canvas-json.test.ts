import { describe, expect, it } from "vitest";
import { importCanvasJson } from "@/features/canvas-studio/importers/import-canvas-json";
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
  {
    id: "text-1",
    type: "text",
    x: 40,
    y: 60,
    width: 220,
    height: 48,
    text: "Hello RainbowCode",
    fontSize: 24,
    fill: "var(--color-foreground)",
  },
  {
    id: "group-1",
    type: "group",
    x: 10,
    y: 20,
    width: 250,
    height: 120,
    childNodeIds: ["rectangle-1", "text-1"],
  },
];

describe("importCanvasJson", () => {
  it("imports valid canvas JSON", () => {
    const output = importCanvasJson(
      JSON.stringify({
        version: 1,
        exportedAt: new Date().toISOString(),
        nodes,
      }),
    );

    expect(output).toEqual(nodes);
  });

  it("rejects unsupported version", () => {
    expect(() =>
      importCanvasJson(
        JSON.stringify({
          version: 2,
          nodes,
        }),
      ),
    ).toThrow("unsupported canvas version");
  });

  it("rejects invalid nodes payload", () => {
    expect(() =>
      importCanvasJson(
        JSON.stringify({
          version: 1,
          nodes: "invalid",
        }),
      ),
    ).toThrow("nodes must be an array");
  });

  it("rejects invalid node shape", () => {
    expect(() =>
      importCanvasJson(
        JSON.stringify({
          version: 1,
          nodes: [
            {
              id: "broken",
              type: "rectangle",
            },
          ],
        }),
      ),
    ).toThrow("invalid node detected");
  });
});