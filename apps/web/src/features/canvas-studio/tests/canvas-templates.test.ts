import { describe, expect, it } from "vitest";
import {
  canvasTemplates,
  getCanvasTemplate,
} from "@/features/canvas-studio/templates/canvas-templates";

describe("canvasTemplates", () => {
  it("contains production starter templates", () => {
    expect(canvasTemplates.length).toBeGreaterThanOrEqual(2);
  });

  it("returns hero template", () => {
    const template = getCanvasTemplate("hero");

    expect(template.name).toBe("Hero Section");
    expect(template.nodes.length).toBeGreaterThan(0);
  });

  it("returns pricing card template", () => {
    const template = getCanvasTemplate("pricing-card");

    expect(template.name).toBe("Pricing Card");
    expect(template.nodes.length).toBeGreaterThan(0);
  });
});