export type CanvasShortcutAction =
  | "delete-selected"
  | "duplicate-selected"
  | "copy-selected"
  | "paste-copied"
  | "clear-selection"
  | "zoom-in"
  | "zoom-out"
  | "reset-zoom"
  | "undo"
  | "redo"
  | "none";

export type CanvasShortcutInput = {
  readonly key: string;
  readonly metaKey: boolean;
  readonly ctrlKey: boolean;
  readonly shiftKey?: boolean;
};

function isModifierPressed(input: CanvasShortcutInput): boolean {
  return input.metaKey || input.ctrlKey;
}

export function getCanvasShortcutAction(
  input: CanvasShortcutInput,
): CanvasShortcutAction {
  const key = input.key.toLowerCase();

  if (key === "delete" || key === "backspace") {
    return "delete-selected";
  }

  if (key === "escape") {
    return "clear-selection";
  }

  if (!isModifierPressed(input)) {
    return "none";
  }

  if (key === "z" && input.shiftKey === true) {
    return "redo";
  }

  if (key === "z") {
    return "undo";
  }

  if (key === "y") {
    return "redo";
  }

  if (key === "c") {
    return "copy-selected";
  }

  if (key === "v") {
    return "paste-copied";
  }

  if (key === "d") {
    return "duplicate-selected";
  }

  if (key === "0") {
    return "reset-zoom";
  }

  if (key === "+" || key === "=") {
    return "zoom-in";
  }

  if (key === "-" || key === "_") {
    return "zoom-out";
  }

  return "none";
}