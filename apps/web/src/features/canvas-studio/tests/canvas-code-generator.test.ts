import { describe, expect, it } from "vitest";
import { generateCanvasCode } from "@/features/canvas-studio/generators/canvas-code-generator";
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
];

describe("generateCanvasCode", () => {
  it("generates canvas wrapper", () => {
    const output = generateCanvasCode(nodes);

    expect(output).toContain("<section");
    expect(output).toContain("relative min-h-[520px]");
  });

  it("generates rectangle node code", () => {
    const output = generateCanvasCode(nodes);

    expect(output).toContain('left: "10px"');
    expect(output).toContain('top: "20px"');
    expect(output).toContain('background: "var(--color-primary)"');
  });

  it("generates text node code", () => {
    const output = generateCanvasCode(nodes);

    expect(output).toContain("Hello RainbowCode");
    expect(output).toContain('fontSize: "24px"');
    expect(output).toContain('color: "var(--color-foreground)"');
  });

  it("generates group node code", () => {
  const output = generateCanvasCode([
    {
      id: "group-1",
      type: "group",
      x: 10,
      y: 20,
      width: 300,
      height: 180,
      childNodeIds: ["rectangle-1", "text-1"],
    },
  ]);

  expect(output).toContain('data-rbc-group="group-1"');
  expect(output).toContain('data-rbc-children="rectangle-1,text-1"');
  expect(output).toContain('left: "10px"');
  expect(output).toContain('width: "300px"');
});

  it("escapes unsafe text", () => {
    const output = generateCanvasCode([
      {
        id: "text-danger",
        type: "text",
        x: 0,
        y: 0,
        width: 200,
        height: 48,
        text: "<Hello & Design>",
        fontSize: 24,
        fill: "var(--color-foreground)",
      },
    ]);

    expect(output).toContain("&lt;Hello &amp; Design&gt;");
  });
});