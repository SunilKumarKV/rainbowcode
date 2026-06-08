"use client";

import { create } from "zustand";
import type { CanvasNode } from "@/features/canvas-studio/types/canvas-node";
import { resizeCanvasNode } from "@/features/canvas-studio/utils/canvas-node-utils";
import {
  decreaseCanvasZoom,
  increaseCanvasZoom,
} from "@/features/canvas-studio/utils/canvas-zoom";

type CanvasNodeUpdate = Partial<{
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly fill: string;
  readonly radius: number;
  readonly text: string;
  readonly fontSize: number;
}>;

type CanvasStoreState = {
  readonly nodes: readonly CanvasNode[];
  readonly selectedNodeIds: readonly string[];
  readonly zoom: number;
  readonly addRectangle: () => void;
  readonly addText: () => void;
  readonly selectNode: (nodeId: string, additive?: boolean) => void;
  readonly clearSelection: () => void;
  readonly moveNode: (
    nodeId: string,
    position: { readonly x: number; readonly y: number },
  ) => void;
  readonly resizeNode: (
    nodeId: string,
    size: { readonly width: number; readonly height: number },
  ) => void;
  readonly updateNode: (nodeId: string, update: CanvasNodeUpdate) => void;
  readonly duplicateSelectedNodes: () => void;
  readonly groupSelectedNodes: () => void;
  readonly bringSelectedForward: () => void;
  readonly sendSelectedBackward: () => void;
  readonly bringSelectedToFront: () => void;
  readonly sendSelectedToBack: () => void;
  readonly zoomIn: () => void;
  readonly zoomOut: () => void;
  readonly resetZoom: () => void;
  readonly deleteSelectedNode: () => void;
  readonly resetCanvas: () => void;
};

function createNodeId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}

function duplicateCanvasNode(node: CanvasNode): CanvasNode {
  if (node.type === "group") {
    return {
      ...node,
      id: createNodeId("group"),
      x: node.x + 24,
      y: node.y + 24,
      childNodeIds: [...node.childNodeIds],
    };
  }

  return {
    ...node,
    id: createNodeId(node.type),
    x: node.x + 24,
    y: node.y + 24,
  };
}

function getGroupBounds(nodes: readonly CanvasNode[]): {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
} {
  const minX = Math.min(...nodes.map((node) => node.x));
  const minY = Math.min(...nodes.map((node) => node.y));
  const maxX = Math.max(...nodes.map((node) => node.x + node.width));
  const maxY = Math.max(...nodes.map((node) => node.y + node.height));

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

function moveSelectedForward(
  nodes: readonly CanvasNode[],
  selectedNodeIds: readonly string[],
): readonly CanvasNode[] {
  const nextNodes = [...nodes];

  for (let index = nextNodes.length - 2; index >= 0; index -= 1) {
    const node = nextNodes[index];

    if (node !== undefined && selectedNodeIds.includes(node.id)) {
      const nextNode = nextNodes[index + 1];

      if (nextNode !== undefined && !selectedNodeIds.includes(nextNode.id)) {
        nextNodes[index] = nextNode;
        nextNodes[index + 1] = node;
      }
    }
  }

  return nextNodes;
}

function moveSelectedBackward(
  nodes: readonly CanvasNode[],
  selectedNodeIds: readonly string[],
): readonly CanvasNode[] {
  const nextNodes = [...nodes];

  for (let index = 1; index < nextNodes.length; index += 1) {
    const node = nextNodes[index];

    if (node !== undefined && selectedNodeIds.includes(node.id)) {
      const previousNode = nextNodes[index - 1];

      if (
        previousNode !== undefined &&
        !selectedNodeIds.includes(previousNode.id)
      ) {
        nextNodes[index - 1] = node;
        nextNodes[index] = previousNode;
      }
    }
  }

  return nextNodes;
}

function moveSelectedToFront(
  nodes: readonly CanvasNode[],
  selectedNodeIds: readonly string[],
): readonly CanvasNode[] {
  const unselectedNodes = nodes.filter(
    (node) => !selectedNodeIds.includes(node.id),
  );
  const selectedNodes = nodes.filter((node) => selectedNodeIds.includes(node.id));

  return [...unselectedNodes, ...selectedNodes];
}

function moveSelectedToBack(
  nodes: readonly CanvasNode[],
  selectedNodeIds: readonly string[],
): readonly CanvasNode[] {
  const selectedNodes = nodes.filter((node) => selectedNodeIds.includes(node.id));
  const unselectedNodes = nodes.filter(
    (node) => !selectedNodeIds.includes(node.id),
  );

  return [...selectedNodes, ...unselectedNodes];
}

export const useCanvasStore = create<CanvasStoreState>((set) => ({
  nodes: [],
  selectedNodeIds: [],
  zoom: 1,

  addRectangle: () => {
    const node: CanvasNode = {
      id: createNodeId("rectangle"),
      type: "rectangle",
      x: 120,
      y: 120,
      width: 180,
      height: 110,
      fill: "var(--color-primary)",
      radius: 16,
    };

    set((state) => ({
      nodes: [...state.nodes, node],
      selectedNodeIds: [node.id],
    }));
  },

  addText: () => {
    const node: CanvasNode = {
      id: createNodeId("text"),
      type: "text",
      x: 160,
      y: 180,
      width: 220,
      height: 48,
      text: "RainbowCode",
      fontSize: 24,
      fill: "var(--color-foreground)",
    };

    set((state) => ({
      nodes: [...state.nodes, node],
      selectedNodeIds: [node.id],
    }));
  },

  selectNode: (nodeId, additive = false) => {
    set((state) => {
      if (!additive) {
        return {
          selectedNodeIds: [nodeId],
        };
      }

      const alreadySelected = state.selectedNodeIds.includes(nodeId);

      return {
        selectedNodeIds: alreadySelected
          ? state.selectedNodeIds.filter((id) => id !== nodeId)
          : [...state.selectedNodeIds, nodeId],
      };
    });
  },

  clearSelection: () => {
    set({
      selectedNodeIds: [],
    });
  },

  moveNode: (nodeId, position) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              x: position.x,
              y: position.y,
            }
          : node,
      ),
    }));
  },

  resizeNode: (nodeId, size) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? resizeCanvasNode(node, size) : node,
      ),
    }));
  },

  updateNode: (nodeId, update) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? ({
              ...node,
              ...update,
              id: node.id,
              type: node.type,
            } as CanvasNode)
          : node,
      ),
    }));
  },

  duplicateSelectedNodes: () => {
    set((state) => {
      if (state.selectedNodeIds.length === 0) {
        return state;
      }

      const selectedNodes = state.nodes.filter((node) =>
        state.selectedNodeIds.includes(node.id),
      );

      const duplicatedNodes = selectedNodes.map((node) =>
        duplicateCanvasNode(node),
      );

      return {
        nodes: [...state.nodes, ...duplicatedNodes],
        selectedNodeIds: duplicatedNodes.map((node) => node.id),
      };
    });
  },

  groupSelectedNodes: () => {
    set((state) => {
      if (state.selectedNodeIds.length < 2) {
        return state;
      }

      const selectedNodes = state.nodes.filter((node) =>
        state.selectedNodeIds.includes(node.id),
      );

      if (selectedNodes.length < 2) {
        return state;
      }

      const bounds = getGroupBounds(selectedNodes);

      const groupNode: CanvasNode = {
        id: createNodeId("group"),
        type: "group",
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
        childNodeIds: selectedNodes.map((node) => node.id),
      };

      return {
        nodes: [...state.nodes, groupNode],
        selectedNodeIds: [groupNode.id],
      };
    });
  },

  bringSelectedForward: () => {
    set((state) => ({
      nodes: moveSelectedForward(state.nodes, state.selectedNodeIds),
    }));
  },

  sendSelectedBackward: () => {
    set((state) => ({
      nodes: moveSelectedBackward(state.nodes, state.selectedNodeIds),
    }));
  },

  bringSelectedToFront: () => {
    set((state) => ({
      nodes: moveSelectedToFront(state.nodes, state.selectedNodeIds),
    }));
  },

  sendSelectedToBack: () => {
    set((state) => ({
      nodes: moveSelectedToBack(state.nodes, state.selectedNodeIds),
    }));
  },

  zoomIn: () => {
    set((state) => ({
      zoom: increaseCanvasZoom(state.zoom),
    }));
  },

  zoomOut: () => {
    set((state) => ({
      zoom: decreaseCanvasZoom(state.zoom),
    }));
  },

  resetZoom: () => {
    set({ zoom: 1 });
  },

  deleteSelectedNode: () => {
    set((state) => ({
      nodes: state.nodes.filter(
        (node) => !state.selectedNodeIds.includes(node.id),
      ),
      selectedNodeIds: [],
    }));
  },

  resetCanvas: () => {
    set({
      nodes: [],
      selectedNodeIds: [],
      zoom: 1,
    });
  },
}));