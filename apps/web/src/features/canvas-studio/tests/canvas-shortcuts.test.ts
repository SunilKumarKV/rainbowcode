import { describe, expect, it } from "vitest";
import { getCanvasShortcutAction } from "@/features/canvas-studio/utils/canvas-shortcuts";

describe("getCanvasShortcutAction", () => {
  it("maps Delete to delete selected node", () => {
    expect(
      getCanvasShortcutAction({
        key: "Delete",
        metaKey: false,
        ctrlKey: false,
      }),
    ).toBe("delete-selected");
  });

  it("maps Backspace to delete selected node", () => {
    expect(
      getCanvasShortcutAction({
        key: "Backspace",
        metaKey: false,
        ctrlKey: false,
      }),
    ).toBe("delete-selected");
  });

  it("maps Escape to clear selection", () => {
    expect(
      getCanvasShortcutAction({
        key: "Escape",
        metaKey: false,
        ctrlKey: false,
      }),
    ).toBe("clear-selection");
  });

  it("maps Cmd/Ctrl + 0 to reset zoom", () => {
    expect(
      getCanvasShortcutAction({
        key: "0",
        metaKey: true,
        ctrlKey: false,
      }),
    ).toBe("reset-zoom");

    expect(
      getCanvasShortcutAction({
        key: "0",
        metaKey: false,
        ctrlKey: true,
      }),
    ).toBe("reset-zoom");
  });

  it("maps Cmd/Ctrl + plus to zoom in", () => {
    expect(
      getCanvasShortcutAction({
        key: "+",
        metaKey: true,
        ctrlKey: false,
      }),
    ).toBe("zoom-in");

    expect(
      getCanvasShortcutAction({
        key: "=",
        metaKey: false,
        ctrlKey: true,
      }),
    ).toBe("zoom-in");
  });

  it("maps Cmd/Ctrl + minus to zoom out", () => {
    expect(
      getCanvasShortcutAction({
        key: "-",
        metaKey: true,
        ctrlKey: false,
      }),
    ).toBe("zoom-out");

    expect(
      getCanvasShortcutAction({
        key: "_",
        metaKey: false,
        ctrlKey: true,
      }),
    ).toBe("zoom-out");
  });

  it("returns none for unrelated keys", () => {
    expect(
      getCanvasShortcutAction({
        key: "a",
        metaKey: false,
        ctrlKey: false,
      }),
    ).toBe("none");
  });
});