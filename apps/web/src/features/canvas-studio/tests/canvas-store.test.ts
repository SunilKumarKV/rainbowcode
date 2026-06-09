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
    expect(state.selectedNodeIds).toEqual([state.nodes[0]?.id]);
  });

  it("adds a text node", () => {
    useCanvasStore.getState().addText();

    const state = useCanvasStore.getState();

    expect(state.nodes).toHaveLength(1);
    expect(state.nodes[0]?.type).toBe("text");
    expect(state.selectedNodeIds).toEqual([state.nodes[0]?.id]);
  });

  it("selects a single node", () => {
    useCanvasStore.getState().addRectangle();
    useCanvasStore.getState().addText();

    const nodeId = useCanvasStore.getState().nodes[0]?.id;

    expect(nodeId).toBeDefined();

    if (nodeId !== undefined) {
      useCanvasStore.getState().selectNode(nodeId);
      expect(useCanvasStore.getState().selectedNodeIds).toEqual([nodeId]);
    }
  });

  it("supports additive multi-select", () => {
    useCanvasStore.getState().addRectangle();
    useCanvasStore.getState().addText();

    const firstNodeId = useCanvasStore.getState().nodes[0]?.id;
    const secondNodeId = useCanvasStore.getState().nodes[1]?.id;

    expect(firstNodeId).toBeDefined();
    expect(secondNodeId).toBeDefined();

    if (firstNodeId !== undefined && secondNodeId !== undefined) {
      useCanvasStore.getState().selectNode(firstNodeId);
      useCanvasStore.getState().selectNode(secondNodeId, true);

      expect(useCanvasStore.getState().selectedNodeIds).toEqual([
        firstNodeId,
        secondNodeId,
      ]);
    }
  });

  it("groups multiple selected nodes", () => {
  useCanvasStore.getState().addRectangle();
  useCanvasStore.getState().addText();

  const firstNodeId = useCanvasStore.getState().nodes[0]?.id;
  const secondNodeId = useCanvasStore.getState().nodes[1]?.id;

  expect(firstNodeId).toBeDefined();
  expect(secondNodeId).toBeDefined();

  if (firstNodeId !== undefined && secondNodeId !== undefined) {
    useCanvasStore.getState().selectNode(firstNodeId);
    useCanvasStore.getState().selectNode(secondNodeId, true);
    useCanvasStore.getState().groupSelectedNodes();

    const state = useCanvasStore.getState();
    const groupNode = state.nodes.find((node) => node.type === "group");

    expect(groupNode).toBeDefined();

    if (groupNode?.type === "group") {
      expect(groupNode.childNodeIds).toEqual([firstNodeId, secondNodeId]);
      expect(state.selectedNodeIds).toEqual([groupNode.id]);
    }
  }
});

it("ungroups selected group node", () => {
  useCanvasStore.getState().addRectangle();
  useCanvasStore.getState().addText();

  const firstNodeId = useCanvasStore.getState().nodes[0]?.id;
  const secondNodeId = useCanvasStore.getState().nodes[1]?.id;

  expect(firstNodeId).toBeDefined();
  expect(secondNodeId).toBeDefined();

  if (firstNodeId !== undefined && secondNodeId !== undefined) {
    useCanvasStore.getState().selectNode(firstNodeId);
    useCanvasStore.getState().selectNode(secondNodeId, true);
    useCanvasStore.getState().groupSelectedNodes();

    const groupNode = useCanvasStore
      .getState()
      .nodes.find((node) => node.type === "group");

    expect(groupNode).toBeDefined();

    if (groupNode !== undefined) {
      useCanvasStore.getState().selectNode(groupNode.id);
      useCanvasStore.getState().ungroupSelectedNodes();

      const state = useCanvasStore.getState();

      expect(state.nodes.some((node) => node.id === groupNode.id)).toBe(false);
      expect(state.selectedNodeIds).toEqual([firstNodeId, secondNodeId]);
    }
  }
});

it("moves group and child nodes together", () => {
  useCanvasStore.getState().addRectangle();
  useCanvasStore.getState().addText();

  const firstNode = useCanvasStore.getState().nodes[0];
  const secondNode = useCanvasStore.getState().nodes[1];

  expect(firstNode).toBeDefined();
  expect(secondNode).toBeDefined();

  if (firstNode !== undefined && secondNode !== undefined) {
    useCanvasStore.getState().selectNode(firstNode.id);
    useCanvasStore.getState().selectNode(secondNode.id, true);
    useCanvasStore.getState().groupSelectedNodes();

    const groupNode = useCanvasStore
      .getState()
      .nodes.find((node) => node.type === "group");

    expect(groupNode).toBeDefined();

    if (groupNode?.type === "group") {
      useCanvasStore.getState().moveNode(groupNode.id, {
        x: groupNode.x + 40,
        y: groupNode.y + 30,
      });

      const state = useCanvasStore.getState();
      const movedFirstNode = state.nodes.find((node) => node.id === firstNode.id);
      const movedSecondNode = state.nodes.find(
        (node) => node.id === secondNode.id,
      );
      const movedGroupNode = state.nodes.find((node) => node.id === groupNode.id);

      expect(movedGroupNode?.x).toBe(groupNode.x + 40);
      expect(movedGroupNode?.y).toBe(groupNode.y + 30);
      expect(movedFirstNode?.x).toBe(firstNode.x + 40);
      expect(movedFirstNode?.y).toBe(firstNode.y + 30);
      expect(movedSecondNode?.x).toBe(secondNode.x + 40);
      expect(movedSecondNode?.y).toBe(secondNode.y + 30);
    }
  }
});

it("resizes group and child nodes proportionally", () => {
  useCanvasStore.getState().addRectangle();
  useCanvasStore.getState().addText();

  const firstNode = useCanvasStore.getState().nodes[0];
  const secondNode = useCanvasStore.getState().nodes[1];

  expect(firstNode).toBeDefined();
  expect(secondNode).toBeDefined();

  if (firstNode !== undefined && secondNode !== undefined) {
    useCanvasStore.getState().selectNode(firstNode.id);
    useCanvasStore.getState().selectNode(secondNode.id, true);
    useCanvasStore.getState().groupSelectedNodes();

    const groupNode = useCanvasStore
      .getState()
      .nodes.find((node) => node.type === "group");

    expect(groupNode).toBeDefined();

    if (groupNode?.type === "group") {
      useCanvasStore.getState().resizeNode(groupNode.id, {
        width: groupNode.width * 2,
        height: groupNode.height * 2,
      });

      const state = useCanvasStore.getState();
      const resizedGroupNode = state.nodes.find(
        (node) => node.id === groupNode.id,
      );
      const resizedFirstNode = state.nodes.find(
        (node) => node.id === firstNode.id,
      );
      const resizedSecondNode = state.nodes.find(
        (node) => node.id === secondNode.id,
      );

      expect(resizedGroupNode?.width).toBe(groupNode.width * 2);
      expect(resizedGroupNode?.height).toBe(groupNode.height * 2);
      expect(resizedFirstNode?.width).toBe(firstNode.width * 2);
      expect(resizedFirstNode?.height).toBe(firstNode.height * 2);
      expect(resizedSecondNode?.width).toBe(secondNode.width * 2);
      expect(resizedSecondNode?.height).toBe(secondNode.height * 2);
    }
  }
});

it("updates group size from properties and resizes child nodes", () => {
  useCanvasStore.getState().addRectangle();
  useCanvasStore.getState().addText();

  const firstNode = useCanvasStore.getState().nodes[0];

  expect(firstNode).toBeDefined();

  if (firstNode !== undefined) {
    const secondNode = useCanvasStore.getState().nodes[1];

    expect(secondNode).toBeDefined();

    if (secondNode !== undefined) {
      useCanvasStore.getState().selectNode(firstNode.id);
      useCanvasStore.getState().selectNode(secondNode.id, true);
      useCanvasStore.getState().groupSelectedNodes();

      const groupNode = useCanvasStore
        .getState()
        .nodes.find((node) => node.type === "group");

      expect(groupNode).toBeDefined();

      if (groupNode?.type === "group") {
        useCanvasStore.getState().updateNode(groupNode.id, {
          width: groupNode.width * 2,
          height: groupNode.height * 2,
        });

        const state = useCanvasStore.getState();
        const resizedFirstNode = state.nodes.find(
          (node) => node.id === firstNode.id,
        );

        expect(resizedFirstNode?.width).toBe(firstNode.width * 2);
        expect(resizedFirstNode?.height).toBe(firstNode.height * 2);
      }
    }
  }
});

it("updates group position from properties and moves child nodes", () => {
  useCanvasStore.getState().addRectangle();
  useCanvasStore.getState().addText();

  const firstNode = useCanvasStore.getState().nodes[0];
  const secondNode = useCanvasStore.getState().nodes[1];

  expect(firstNode).toBeDefined();
  expect(secondNode).toBeDefined();

  if (firstNode !== undefined && secondNode !== undefined) {
    useCanvasStore.getState().selectNode(firstNode.id);
    useCanvasStore.getState().selectNode(secondNode.id, true);
    useCanvasStore.getState().groupSelectedNodes();

    const groupNode = useCanvasStore
      .getState()
      .nodes.find((node) => node.type === "group");

    expect(groupNode).toBeDefined();

    if (groupNode?.type === "group") {
      useCanvasStore.getState().updateNode(groupNode.id, {
        x: groupNode.x + 12,
        y: groupNode.y + 18,
      });

      const state = useCanvasStore.getState();
      const movedFirstNode = state.nodes.find((node) => node.id === firstNode.id);
      const movedSecondNode = state.nodes.find(
        (node) => node.id === secondNode.id,
      );

      expect(movedFirstNode?.x).toBe(firstNode.x + 12);
      expect(movedFirstNode?.y).toBe(firstNode.y + 18);
      expect(movedSecondNode?.x).toBe(secondNode.x + 12);
      expect(movedSecondNode?.y).toBe(secondNode.y + 18);
    }
  }
});

  it("toggles node out of multi-selection", () => {
    useCanvasStore.getState().addRectangle();
    useCanvasStore.getState().addText();

    const firstNodeId = useCanvasStore.getState().nodes[0]?.id;
    const secondNodeId = useCanvasStore.getState().nodes[1]?.id;

    expect(firstNodeId).toBeDefined();
    expect(secondNodeId).toBeDefined();

    if (firstNodeId !== undefined && secondNodeId !== undefined) {
      useCanvasStore.getState().selectNode(firstNodeId);
      useCanvasStore.getState().selectNode(secondNodeId, true);
      useCanvasStore.getState().selectNode(firstNodeId, true);

      expect(useCanvasStore.getState().selectedNodeIds).toEqual([secondNodeId]);
    }
  });

  it("clears selection", () => {
    useCanvasStore.getState().addRectangle();

    useCanvasStore.getState().clearSelection();

    expect(useCanvasStore.getState().selectedNodeIds).toEqual([]);
  });

  it("duplicates a selected rectangle node", () => {
    useCanvasStore.getState().addRectangle();

    const originalNode = useCanvasStore.getState().nodes[0];

    expect(originalNode).toBeDefined();

    if (originalNode !== undefined) {
      useCanvasStore.getState().duplicateSelectedNodes();

      const state = useCanvasStore.getState();
      const duplicatedNode = state.nodes[1];

      expect(state.nodes).toHaveLength(2);
      expect(duplicatedNode?.type).toBe("rectangle");
      expect(duplicatedNode?.id).not.toBe(originalNode.id);
      expect(duplicatedNode?.x).toBe(originalNode.x + 24);
      expect(duplicatedNode?.y).toBe(originalNode.y + 24);
      expect(duplicatedNode?.width).toBe(originalNode.width);
      expect(duplicatedNode?.height).toBe(originalNode.height);
      expect(state.selectedNodeIds).toEqual([duplicatedNode?.id]);
    }
  });

  it("duplicates a selected text node", () => {
    useCanvasStore.getState().addText();

    const originalNode = useCanvasStore.getState().nodes[0];

    expect(originalNode).toBeDefined();

    if (originalNode !== undefined) {
      useCanvasStore.getState().duplicateSelectedNodes();

      const state = useCanvasStore.getState();
      const duplicatedNode = state.nodes[1];

      expect(state.nodes).toHaveLength(2);
      expect(duplicatedNode?.type).toBe("text");
      expect(duplicatedNode?.id).not.toBe(originalNode.id);
      expect(duplicatedNode?.x).toBe(originalNode.x + 24);
      expect(duplicatedNode?.y).toBe(originalNode.y + 24);
      expect(duplicatedNode?.width).toBe(originalNode.width);
      expect(duplicatedNode?.height).toBe(originalNode.height);
      expect(state.selectedNodeIds).toEqual([duplicatedNode?.id]);
    }
  });

  it("duplicates multiple selected nodes", () => {
    useCanvasStore.getState().addRectangle();
    useCanvasStore.getState().addText();

    const firstNodeId = useCanvasStore.getState().nodes[0]?.id;
    const secondNodeId = useCanvasStore.getState().nodes[1]?.id;

    expect(firstNodeId).toBeDefined();
    expect(secondNodeId).toBeDefined();

    if (firstNodeId !== undefined && secondNodeId !== undefined) {
      useCanvasStore.getState().selectNode(firstNodeId);
      useCanvasStore.getState().selectNode(secondNodeId, true);
      useCanvasStore.getState().duplicateSelectedNodes();

      const state = useCanvasStore.getState();

      expect(state.nodes).toHaveLength(4);
      expect(state.selectedNodeIds).toHaveLength(2);
      expect(state.selectedNodeIds).toEqual([
        state.nodes[2]?.id,
        state.nodes[3]?.id,
      ]);
    }
  });

  it("does nothing when duplicating without selection", () => {
    useCanvasStore.getState().addRectangle();
    useCanvasStore.getState().clearSelection();

    useCanvasStore.getState().duplicateSelectedNodes();

    expect(useCanvasStore.getState().nodes).toHaveLength(1);
    expect(useCanvasStore.getState().selectedNodeIds).toEqual([]);
  });

  it("brings selected node forward", () => {
    useCanvasStore.getState().addRectangle();
    useCanvasStore.getState().addText();

    const firstNodeId = useCanvasStore.getState().nodes[0]?.id;

    expect(firstNodeId).toBeDefined();

    if (firstNodeId !== undefined) {
      useCanvasStore.getState().selectNode(firstNodeId);
      useCanvasStore.getState().bringSelectedForward();

      expect(useCanvasStore.getState().nodes[1]?.id).toBe(firstNodeId);
    }
  });

  it("sends selected node backward", () => {
    useCanvasStore.getState().addRectangle();
    useCanvasStore.getState().addText();

    const secondNodeId = useCanvasStore.getState().nodes[1]?.id;

    expect(secondNodeId).toBeDefined();

    if (secondNodeId !== undefined) {
      useCanvasStore.getState().selectNode(secondNodeId);
      useCanvasStore.getState().sendSelectedBackward();

      expect(useCanvasStore.getState().nodes[0]?.id).toBe(secondNodeId);
    }
  });

  it("brings selected node to front", () => {
    useCanvasStore.getState().addRectangle();
    useCanvasStore.getState().addText();
    useCanvasStore.getState().addRectangle();

    const firstNodeId = useCanvasStore.getState().nodes[0]?.id;

    expect(firstNodeId).toBeDefined();

    if (firstNodeId !== undefined) {
      useCanvasStore.getState().selectNode(firstNodeId);
      useCanvasStore.getState().bringSelectedToFront();

      expect(useCanvasStore.getState().nodes[2]?.id).toBe(firstNodeId);
    }
  });

  it("sends selected node to back", () => {
    useCanvasStore.getState().addRectangle();
    useCanvasStore.getState().addText();
    useCanvasStore.getState().addRectangle();

    const lastNodeId = useCanvasStore.getState().nodes[2]?.id;

    expect(lastNodeId).toBeDefined();

    if (lastNodeId !== undefined) {
      useCanvasStore.getState().selectNode(lastNodeId);
      useCanvasStore.getState().sendSelectedToBack();

      expect(useCanvasStore.getState().nodes[0]?.id).toBe(lastNodeId);
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

  it("updates a selected node properties", () => {
    useCanvasStore.getState().addRectangle();

    const nodeId = useCanvasStore.getState().nodes[0]?.id;

    expect(nodeId).toBeDefined();

    if (nodeId !== undefined) {
      useCanvasStore.getState().updateNode(nodeId, {
        x: 50,
        y: 60,
        width: 300,
        height: 180,
      });

      const node = useCanvasStore.getState().nodes[0];

      expect(node?.x).toBe(50);
      expect(node?.y).toBe(60);
      expect(node?.width).toBe(300);
      expect(node?.height).toBe(180);
    }
  });

  it("updates zoom controls", () => {
    expect(useCanvasStore.getState().zoom).toBe(1);

    useCanvasStore.getState().zoomIn();
    expect(useCanvasStore.getState().zoom).toBe(1.1);

    useCanvasStore.getState().zoomOut();
    expect(useCanvasStore.getState().zoom).toBe(1);

    useCanvasStore.getState().resetZoom();
    expect(useCanvasStore.getState().zoom).toBe(1);
  });

  it("deletes all selected nodes", () => {
    useCanvasStore.getState().addRectangle();
    useCanvasStore.getState().addText();

    const firstNodeId = useCanvasStore.getState().nodes[0]?.id;
    const secondNodeId = useCanvasStore.getState().nodes[1]?.id;

    expect(firstNodeId).toBeDefined();
    expect(secondNodeId).toBeDefined();

    if (firstNodeId !== undefined && secondNodeId !== undefined) {
      useCanvasStore.getState().selectNode(firstNodeId);
      useCanvasStore.getState().selectNode(secondNodeId, true);

      useCanvasStore.getState().deleteSelectedNode();

      const state = useCanvasStore.getState();

      expect(state.nodes).toHaveLength(0);
      expect(state.selectedNodeIds).toEqual([]);
    }
  });
});