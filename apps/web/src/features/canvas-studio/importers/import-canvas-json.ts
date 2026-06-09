import type { CanvasNode } from "@/features/canvas-studio/types/canvas-node";

type CanvasJsonImportPayload = {
  readonly version?: unknown;
  readonly nodes?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isRectangleNode(value: unknown): value is CanvasNode {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value.type === "rectangle" &&
    isString(value.id) &&
    isNumber(value.x) &&
    isNumber(value.y) &&
    isNumber(value.width) &&
    isNumber(value.height) &&
    isString(value.fill) &&
    isNumber(value.radius)
  );
}

function isTextNode(value: unknown): value is CanvasNode {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value.type === "text" &&
    isString(value.id) &&
    isNumber(value.x) &&
    isNumber(value.y) &&
    isNumber(value.width) &&
    isNumber(value.height) &&
    isString(value.text) &&
    isNumber(value.fontSize) &&
    isString(value.fill)
  );
}

function isGroupNode(value: unknown): value is CanvasNode {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value.type === "group" &&
    isString(value.id) &&
    isNumber(value.x) &&
    isNumber(value.y) &&
    isNumber(value.width) &&
    isNumber(value.height) &&
    Array.isArray(value.childNodeIds) &&
    value.childNodeIds.every(isString)
  );
}

function isCanvasNode(value: unknown): value is CanvasNode {
  return isRectangleNode(value) || isTextNode(value) || isGroupNode(value);
}

export function importCanvasJson(json: string): readonly CanvasNode[] {
  const parsed = JSON.parse(json) as CanvasJsonImportPayload;

  if (!isRecord(parsed)) {
    throw new Error("Canvas import failed: JSON root must be an object.");
  }

  if (parsed.version !== 1) {
    throw new Error("Canvas import failed: unsupported canvas version.");
  }

  if (!Array.isArray(parsed.nodes)) {
    throw new Error("Canvas import failed: nodes must be an array.");
  }

  if (!parsed.nodes.every(isCanvasNode)) {
    throw new Error("Canvas import failed: invalid node detected.");
  }

  return parsed.nodes;
}