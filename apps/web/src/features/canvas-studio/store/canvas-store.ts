"use client";

import { create } from "zustand";
import {
  createCanvasSnapshot,
  pushCanvasHistory,
  type CanvasHistoryState,
} from "@/features/canvas-studio/history/canvas-history";
import { getCanvasTemplate } from "@/features/canvas-studio/templates/canvas-templates";
import type { CanvasTemplateId } from "@/features/canvas-studio/templates/canvas-templates";
import type { CanvasNode } from "@/features/canvas-studio/types/canvas-node";
import { snapSizeToGrid, snapToGrid } from "@/features/canvas-studio/utils/canvas-grid";
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
  readonly clipboardNodeIds: readonly string[];
  readonly snapToGridEnabled: boolean;
  readonly zoom: number;
  readonly history: CanvasHistoryState;
  readonly canUndo: boolean;
  readonly canRedo: boolean;
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
  readonly copySelectedNodes: () => void;
  readonly pasteCopiedNodes: () => void;
  readonly groupSelectedNodes: () => void;
  readonly ungroupSelectedNodes: () => void;
  readonly bringSelectedForward: () => void;
  readonly sendSelectedBackward: () => void;
  readonly bringSelectedToFront: () => void;
  readonly sendSelectedToBack: () => void;
  readonly applyTemplate: (templateId: CanvasTemplateId) => void;
  readonly importNodes: (nodes: readonly CanvasNode[]) => void;
  readonly undo: () => void;
  readonly redo: () => void;
  readonly toggleSnapToGrid: () => void;
  readonly zoomIn: () => void;
  readonly zoomOut: () => void;
  readonly resetZoom: () => void;
  readonly deleteSelectedNode: () => void;
  readonly resetCanvas: () => void;
};

function createNodeId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}

function withHistory(state: {
  readonly nodes: readonly CanvasNode[];
  readonly selectedNodeIds: readonly string[];
  readonly history: CanvasHistoryState;
}): Pick<CanvasStoreState, "history" | "canUndo" | "canRedo"> {
  const snapshot = createCanvasSnapshot(state.nodes, state.selectedNodeIds);
  const history = pushCanvasHistory(state.history, snapshot);

  return {
    history,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
  };
}

function maybeSnapPosition(
  position: { readonly x: number; readonly y: number },
  enabled: boolean,
): { readonly x: number; readonly y: number } {
  if (!enabled) {
    return position;
  }

  return {
    x: snapToGrid(position.x),
    y: snapToGrid(position.y),
  };
}

function maybeSnapSize(
  size: { readonly width: number; readonly height: number },
  enabled: boolean,
): { readonly width: number; readonly height: number } {
  if (!enabled) {
    return size;
  }

  return {
    width: snapSizeToGrid(size.width),
    height: snapSizeToGrid(size.height),
  };
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

function moveGroupAndChildren(
  nodes: readonly CanvasNode[],
  groupNode: CanvasNode,
  position: { readonly x: number; readonly y: number },
): readonly CanvasNode[] {
  if (groupNode.type !== "group") {
    return nodes;
  }

  const deltaX = position.x - groupNode.x;
  const deltaY = position.y - groupNode.y;

  return nodes.map((node) => {
    if (node.id === groupNode.id) {
      return {
        ...node,
        x: position.x,
        y: position.y,
      };
    }

    if (groupNode.childNodeIds.includes(node.id)) {
      return {
        ...node,
        x: node.x + deltaX,
        y: node.y + deltaY,
      };
    }

    return node;
  });
}

function resizeGroupAndChildren(
  nodes: readonly CanvasNode[],
  groupNode: CanvasNode,
  size: { readonly width: number; readonly height: number },
): readonly CanvasNode[] {
  if (groupNode.type !== "group") {
    return nodes;
  }

  const nextWidth = Math.max(24, Math.round(size.width));
  const nextHeight = Math.max(24, Math.round(size.height));

  const scaleX = groupNode.width === 0 ? 1 : nextWidth / groupNode.width;
  const scaleY = groupNode.height === 0 ? 1 : nextHeight / groupNode.height;

  return nodes.map((node) => {
    if (node.id === groupNode.id) {
      return {
        ...node,
        width: nextWidth,
        height: nextHeight,
      };
    }

    if (groupNode.childNodeIds.includes(node.id)) {
      const relativeX = node.x - groupNode.x;
      const relativeY = node.y - groupNode.y;

      return {
        ...node,
        x: groupNode.x + relativeX * scaleX,
        y: groupNode.y + relativeY * scaleY,
        width: Math.max(24, Math.round(node.width * scaleX)),
        height: Math.max(24, Math.round(node.height * scaleY)),
      };
    }

    return node;
  });
}

export const useCanvasStore = create<CanvasStoreState>((set) => ({
  nodes: [],
  selectedNodeIds: [],
  clipboardNodeIds: [],
  snapToGridEnabled: true,
  zoom: 1,
  history: {
    past: [],
    future: [],
  },
  canUndo: false,
  canRedo: false,

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
      ...withHistory(state),
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
      ...withHistory(state),
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
    set((state) => {
      const targetNode = state.nodes.find((node) => node.id === nodeId);
      const nextPosition = maybeSnapPosition(
        position,
        state.snapToGridEnabled,
      );

      if (targetNode === undefined) {
        return state;
      }

      if (targetNode.type === "group") {
        return {
          ...withHistory(state),
          nodes: moveGroupAndChildren(state.nodes, targetNode, nextPosition),
        };
      }

      return {
        ...withHistory(state),
        nodes: state.nodes.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                x: nextPosition.x,
                y: nextPosition.y,
              }
            : node,
        ),
      };
    });
  },

  resizeNode: (nodeId, size) => {
    set((state) => {
      const targetNode = state.nodes.find((node) => node.id === nodeId);
      const nextSize = maybeSnapSize(size, state.snapToGridEnabled);

      if (targetNode === undefined) {
        return state;
      }

      if (targetNode.type === "group") {
        return {
          ...withHistory(state),
          nodes: resizeGroupAndChildren(state.nodes, targetNode, nextSize),
        };
      }

      return {
        ...withHistory(state),
        nodes: state.nodes.map((node) =>
          node.id === nodeId ? resizeCanvasNode(node, nextSize) : node,
        ),
      };
    });
  },

  updateNode: (nodeId, update) => {
    set((state) => {
      const targetNode = state.nodes.find((node) => node.id === nodeId);

      if (targetNode?.type === "group") {
        let nextNodes = state.nodes;

        if (update.x !== undefined || update.y !== undefined) {
          nextNodes = moveGroupAndChildren(nextNodes, targetNode, {
            x: update.x ?? targetNode.x,
            y: update.y ?? targetNode.y,
          });
        }

        const movedGroupNode = nextNodes.find((node) => node.id === nodeId);

        if (
          movedGroupNode?.type === "group" &&
          (update.width !== undefined || update.height !== undefined)
        ) {
          nextNodes = resizeGroupAndChildren(nextNodes, movedGroupNode, {
            width: update.width ?? movedGroupNode.width,
            height: update.height ?? movedGroupNode.height,
          });
        }

        return {
          ...withHistory(state),
          nodes: nextNodes,
        };
      }

      return {
        ...withHistory(state),
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
      };
    });
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
        ...withHistory(state),
        nodes: [...state.nodes, ...duplicatedNodes],
        selectedNodeIds: duplicatedNodes.map((node) => node.id),
      };
    });
  },

  copySelectedNodes: () => {
    set((state) => ({
      clipboardNodeIds: [...state.selectedNodeIds],
    }));
  },

  pasteCopiedNodes: () => {
    set((state) => {
      if (state.clipboardNodeIds.length === 0) {
        return state;
      }

      const copiedNodes = state.nodes.filter((node) =>
        state.clipboardNodeIds.includes(node.id),
      );

      if (copiedNodes.length === 0) {
        return state;
      }

      const pastedNodes = copiedNodes.map((node) => duplicateCanvasNode(node));

      return {
        ...withHistory(state),
        nodes: [...state.nodes, ...pastedNodes],
        selectedNodeIds: pastedNodes.map((node) => node.id),
        clipboardNodeIds: pastedNodes.map((node) => node.id),
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
        ...withHistory(state),
        nodes: [...state.nodes, groupNode],
        selectedNodeIds: [groupNode.id],
      };
    });
  },

  ungroupSelectedNodes: () => {
    set((state) => {
      const selectedGroups = state.nodes.filter(
        (node) =>
          node.type === "group" && state.selectedNodeIds.includes(node.id),
      );

      if (selectedGroups.length === 0) {
        return state;
      }

      const childNodeIds = selectedGroups.flatMap((group) =>
        group.type === "group" ? [...group.childNodeIds] : [],
      );

      return {
        ...withHistory(state),
        nodes: state.nodes.filter(
          (node) => !selectedGroups.some((group) => group.id === node.id),
        ),
        selectedNodeIds: childNodeIds,
      };
    });
  },

  bringSelectedForward: () => {
    set((state) => ({
      ...withHistory(state),
      nodes: moveSelectedForward(state.nodes, state.selectedNodeIds),
    }));
  },

  sendSelectedBackward: () => {
    set((state) => ({
      ...withHistory(state),
      nodes: moveSelectedBackward(state.nodes, state.selectedNodeIds),
    }));
  },

  bringSelectedToFront: () => {
    set((state) => ({
      ...withHistory(state),
      nodes: moveSelectedToFront(state.nodes, state.selectedNodeIds),
    }));
  },

  sendSelectedToBack: () => {
    set((state) => ({
      ...withHistory(state),
      nodes: moveSelectedToBack(state.nodes, state.selectedNodeIds),
    }));
  },

  applyTemplate: (templateId) => {
    const template = getCanvasTemplate(templateId);

    set((state) => ({
      ...withHistory(state),
      nodes: template.nodes,
      selectedNodeIds: [],
    }));
  },

  importNodes: (nodes) => {
    set((state) => ({
      ...withHistory(state),
      nodes,
      selectedNodeIds: [],
    }));
  },

  undo: () => {
    set((state) => {
      const previousSnapshot = state.history.past.at(-1);

      if (previousSnapshot === undefined) {
        return state;
      }

      const currentSnapshot = createCanvasSnapshot(
        state.nodes,
        state.selectedNodeIds,
      );

      const past = state.history.past.slice(0, -1);
      const future = [currentSnapshot, ...state.history.future];

      return {
        nodes: previousSnapshot.nodes,
        selectedNodeIds: previousSnapshot.selectedNodeIds,
        history: {
          past,
          future,
        },
        canUndo: past.length > 0,
        canRedo: future.length > 0,
      };
    });
  },

  redo: () => {
    set((state) => {
      const nextSnapshot = state.history.future[0];

      if (nextSnapshot === undefined) {
        return state;
      }

      const currentSnapshot = createCanvasSnapshot(
        state.nodes,
        state.selectedNodeIds,
      );

      const past = [...state.history.past, currentSnapshot];
      const future = state.history.future.slice(1);

      return {
        nodes: nextSnapshot.nodes,
        selectedNodeIds: nextSnapshot.selectedNodeIds,
        history: {
          past,
          future,
        },
        canUndo: past.length > 0,
        canRedo: future.length > 0,
      };
    });
  },

  toggleSnapToGrid: () => {
    set((state) => ({
      snapToGridEnabled: !state.snapToGridEnabled,
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
      ...withHistory(state),
      nodes: state.nodes.filter(
        (node) => !state.selectedNodeIds.includes(node.id),
      ),
      selectedNodeIds: [],
    }));
  },

  resetCanvas: () => {
    set((state) => ({
      ...withHistory(state),
      nodes: [],
      selectedNodeIds: [],
      clipboardNodeIds: [],
      snapToGridEnabled: true,
      zoom: 1,
    }));
  },
}));