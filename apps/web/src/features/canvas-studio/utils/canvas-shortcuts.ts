export type CanvasShortcutAction =
  | "delete-selected"
  | "clear-selection"
  | "zoom-in"
  | "zoom-out"
  | "reset-zoom"
  | "none";

export type CanvasShortcutInput = {
  readonly key: string;
  readonly metaKey: boolean;
  readonly ctrlKey: boolean;
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