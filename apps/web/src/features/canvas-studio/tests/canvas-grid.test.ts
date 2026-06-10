import { describe, expect, it } from "vitest";
import {
  CANVAS_GRID_SIZE,
  snapSizeToGrid,
  snapToGrid,
} from "@/features/canvas-studio/utils/canvas-grid";

describe("canvas grid", () => {
  it("snaps values to default grid", () => {
    expect(CANVAS_GRID_SIZE).toBe(8);
    expect(snapToGrid(9)).toBe(8);
    expect(snapToGrid(12)).toBe(16);
    expect(snapToGrid(20)).toBe(24);
  });

  it("snaps sizes and enforces minimum size", () => {
    expect(snapSizeToGrid(10)).toBe(24);
    expect(snapSizeToGrid(31)).toBe(32);
    expect(snapSizeToGrid(35)).toBe(32);
  });
});