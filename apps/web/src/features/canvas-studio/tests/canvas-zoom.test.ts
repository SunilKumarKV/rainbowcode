import { describe, expect, it } from "vitest";
import {
  clampCanvasZoom,
  decreaseCanvasZoom,
  increaseCanvasZoom,
  MAX_CANVAS_ZOOM,
  MIN_CANVAS_ZOOM,
} from "@/features/canvas-studio/utils/canvas-zoom";

describe("canvas zoom utilities", () => {
  it("clamps zoom to minimum", () => {
    expect(clampCanvasZoom(0.1)).toBe(MIN_CANVAS_ZOOM);
  });

  it("clamps zoom to maximum", () => {
    expect(clampCanvasZoom(3)).toBe(MAX_CANVAS_ZOOM);
  });

  it("increases zoom by step", () => {
    expect(increaseCanvasZoom(1)).toBe(1.1);
  });

  it("decreases zoom by step", () => {
    expect(decreaseCanvasZoom(1)).toBe(0.9);
  });
});