export const CANVAS_GRID_SIZE = 8;

export function snapToGrid(value: number, gridSize = CANVAS_GRID_SIZE): number {
  return Math.round(value / gridSize) * gridSize;
}

export function snapSizeToGrid(
  value: number,
  gridSize = CANVAS_GRID_SIZE,
  minSize = 24,
): number {
  return Math.max(minSize, snapToGrid(value, gridSize));
}