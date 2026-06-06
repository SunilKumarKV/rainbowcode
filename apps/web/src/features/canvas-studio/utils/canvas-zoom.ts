export const MIN_CANVAS_ZOOM = 0.5;
export const MAX_CANVAS_ZOOM = 2;
export const CANVAS_ZOOM_STEP = 0.1;

export function clampCanvasZoom(value: number): number {
  return Math.min(MAX_CANVAS_ZOOM, Math.max(MIN_CANVAS_ZOOM, Number(value.toFixed(2))));
}

export function increaseCanvasZoom(currentZoom: number): number {
  return clampCanvasZoom(currentZoom + CANVAS_ZOOM_STEP);
}

export function decreaseCanvasZoom(currentZoom: number): number {
  return clampCanvasZoom(currentZoom - CANVAS_ZOOM_STEP);
}