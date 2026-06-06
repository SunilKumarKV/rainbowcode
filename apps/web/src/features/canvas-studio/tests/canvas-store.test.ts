import { beforeEach, describe, expect, it } from "vitest";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";

describe("useCanvasStore", () => {
  beforeEach(() => {
    useCanvasStore.getState().resetCanvas();
  });

  it("adds a rectangle node", () => {
    useCanvasStore.getState().addRectangle();

    const state = useCanvasStore.getState();

    expect(state.nodes).toHaveLength(1);
    expect(state.nodes[0]?.type).toBe("rectangle");
    expect(state.selectedNodeId).toBe(state.nodes[0]?.id);
  });

  it("adds a text node", () => {
    useCanvasStore.getState().addText();

    const state = useCanvasStore.getState();

    expect(state.nodes).toHaveLength(1);
    expect(state.nodes[0]?.type).toBe("text");
    expect(state.selectedNodeId).toBe(state.nodes[0]?.id);
  });

  it("selects a node", () => {
    useCanvasStore.getState().addRectangle();

    const nodeId = useCanvasStore.getState().nodes[0]?.id;

    expect(nodeId).toBeDefined();

    if (nodeId !== undefined) {
      useCanvasStore.getState().selectNode(nodeId);
      expect(useCanvasStore.getState().selectedNodeId).toBe(nodeId);
    }
  });

  it("moves a node", () => {
    useCanvasStore.getState().addRectangle();

    const nodeId = useCanvasStore.getState().nodes[0]?.id;

    expect(nodeId).toBeDefined();

    if (nodeId !== undefined) {
      useCanvasStore.getState().moveNode(nodeId, { x: 320, y: 240 });

      const node = useCanvasStore.getState().nodes[0];

      expect(node?.x).toBe(320);
      expect(node?.y).toBe(240);
    }
  });

  it("resizes a node", () => {
  useCanvasStore.getState().addRectangle();

  const nodeId = useCanvasStore.getState().nodes[0]?.id;

  expect(nodeId).toBeDefined();

  if (nodeId !== undefined) {
    useCanvasStore.getState().resizeNode(nodeId, {
      width: 320,
      height: 180,
    });

    const node = useCanvasStore.getState().nodes[0];

    expect(node?.width).toBe(320);
    expect(node?.height).toBe(180);
  }
});

  it("deletes selected node", () => {
    useCanvasStore.getState().addRectangle();

    useCanvasStore.getState().deleteSelectedNode();

    const state = useCanvasStore.getState();

    expect(state.nodes).toHaveLength(0);
    expect(state.selectedNodeId).toBeNull();
  });
});