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
  const nextId = createNodeId(node.type);

  if (node.type === "rectangle") {
    return {
      ...node,
      id: nextId,
      x: node.x + 24,
      y: node.y + 24,
    };
  }

  return {
    ...node,
    id: nextId,
    x: node.x + 24,
    y: node.y + 24,
  };
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