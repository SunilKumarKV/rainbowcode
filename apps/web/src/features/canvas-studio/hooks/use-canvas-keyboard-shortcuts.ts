"use client";

import { useEffect } from "react";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";
import { getCanvasShortcutAction } from "@/features/canvas-studio/utils/canvas-shortcuts";

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName.toLowerCase();

  return (
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select" ||
    target.isContentEditable
  );
}

export function useCanvasKeyboardShortcuts(): void {
  const deleteSelectedNode = useCanvasStore((state) => state.deleteSelectedNode);
  const duplicateSelectedNodes = useCanvasStore(
    (state) => state.duplicateSelectedNodes,
  );
  const copySelectedNodes = useCanvasStore((state) => state.copySelectedNodes);
  const pasteCopiedNodes = useCanvasStore((state) => state.pasteCopiedNodes);
  const clearSelection = useCanvasStore((state) => state.clearSelection);
  const zoomIn = useCanvasStore((state) => state.zoomIn);
  const zoomOut = useCanvasStore((state) => state.zoomOut);
  const resetZoom = useCanvasStore((state) => state.resetZoom);
  const undo = useCanvasStore((state) => state.undo);
  const redo = useCanvasStore((state) => state.redo);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      if (isEditableTarget(event.target)) {
        return;
      }

      const action = getCanvasShortcutAction({
        key: event.key,
        metaKey: event.metaKey,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
      });

      if (action === "none") {
        return;
      }

      event.preventDefault();

      if (action === "delete-selected") {
        deleteSelectedNode();
        return;
      }

      if (action === "duplicate-selected") {
        duplicateSelectedNodes();
        return;
      }

      if (action === "copy-selected") {
        copySelectedNodes();
        return;
      }

      if (action === "paste-copied") {
        pasteCopiedNodes();
        return;
      }

      if (action === "clear-selection") {
        clearSelection();
        return;
      }

      if (action === "zoom-in") {
        zoomIn();
        return;
      }

      if (action === "zoom-out") {
        zoomOut();
        return;
      }

      if (action === "undo") {
        undo();
        return;
      }

      if (action === "redo") {
        redo();
        return;
      }

      resetZoom();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    clearSelection,
    copySelectedNodes,
    deleteSelectedNode,
    duplicateSelectedNodes,
    pasteCopiedNodes,
    redo,
    resetZoom,
    undo,
    zoomIn,
    zoomOut,
  ]);
}