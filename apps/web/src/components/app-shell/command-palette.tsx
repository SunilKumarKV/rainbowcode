"use client";

import { useEffect, useMemo, useState } from "react";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";

type Command = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly shortcut?: string;
  readonly action: () => void;
};

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const addRectangle = useCanvasStore((state) => state.addRectangle);
  const addText = useCanvasStore((state) => state.addText);
  const applyTemplate = useCanvasStore((state) => state.applyTemplate);
  const duplicateSelectedNodes = useCanvasStore(
    (state) => state.duplicateSelectedNodes,
  );
  const copySelectedNodes = useCanvasStore((state) => state.copySelectedNodes);
  const pasteCopiedNodes = useCanvasStore((state) => state.pasteCopiedNodes);
  const groupSelectedNodes = useCanvasStore((state) => state.groupSelectedNodes);
  const ungroupSelectedNodes = useCanvasStore(
    (state) => state.ungroupSelectedNodes,
  );
  const undo = useCanvasStore((state) => state.undo);
  const redo = useCanvasStore((state) => state.redo);
  const toggleSnapToGrid = useCanvasStore((state) => state.toggleSnapToGrid);
  const resetCanvas = useCanvasStore((state) => state.resetCanvas);
  const zoomIn = useCanvasStore((state) => state.zoomIn);
  const zoomOut = useCanvasStore((state) => state.zoomOut);
  const resetZoom = useCanvasStore((state) => state.resetZoom);

  const commands = useMemo<readonly Command[]>(
    () => [
      {
        id: "template-hero",
        title: "Apply Hero Template",
        description: "Replace canvas with a landing hero layout.",
        action: () => applyTemplate("hero"),
      },
      {
        id: "template-pricing",
        title: "Apply Pricing Card Template",
        description: "Replace canvas with a SaaS pricing card layout.",
        action: () => applyTemplate("pricing-card"),
      },
      {
        id: "add-rectangle",
        title: "Add Rectangle",
        description: "Create a new visual block on the canvas.",
        action: addRectangle,
      },
      {
        id: "add-text",
        title: "Add Text",
        description: "Create a text layer on the canvas.",
        action: addText,
      },
      {
        id: "duplicate",
        title: "Duplicate Selection",
        description: "Duplicate the selected canvas objects.",
        shortcut: "⌘D",
        action: duplicateSelectedNodes,
      },
      {
        id: "copy",
        title: "Copy Selection",
        description: "Copy selected canvas objects.",
        shortcut: "⌘C",
        action: copySelectedNodes,
      },
      {
        id: "paste",
        title: "Paste Selection",
        description: "Paste copied canvas objects.",
        shortcut: "⌘V",
        action: pasteCopiedNodes,
      },
      {
        id: "group",
        title: "Group Selection",
        description: "Group multiple selected objects.",
        action: groupSelectedNodes,
      },
      {
        id: "ungroup",
        title: "Ungroup Selection",
        description: "Ungroup selected grouped objects.",
        action: ungroupSelectedNodes,
      },
      {
        id: "undo",
        title: "Undo",
        description: "Undo the last canvas action.",
        shortcut: "⌘Z",
        action: undo,
      },
      {
        id: "redo",
        title: "Redo",
        description: "Redo the last undone canvas action.",
        shortcut: "⇧⌘Z",
        action: redo,
      },
      {
        id: "snap",
        title: "Toggle Snap Grid",
        description: "Turn canvas snap grid on or off.",
        action: toggleSnapToGrid,
      },
      {
        id: "zoom-in",
        title: "Zoom In",
        description: "Increase canvas zoom.",
        shortcut: "⌘+",
        action: zoomIn,
      },
      {
        id: "zoom-out",
        title: "Zoom Out",
        description: "Decrease canvas zoom.",
        shortcut: "⌘-",
        action: zoomOut,
      },
      {
        id: "zoom-reset",
        title: "Reset Zoom",
        description: "Reset canvas zoom to 100%.",
        shortcut: "⌘0",
        action: resetZoom,
      },
      {
        id: "reset",
        title: "Reset Canvas",
        description: "Clear the current canvas.",
        action: resetCanvas,
      },
    ],
    [
      addRectangle,
      addText,
      applyTemplate,
      copySelectedNodes,
      duplicateSelectedNodes,
      groupSelectedNodes,
      pasteCopiedNodes,
      redo,
      resetCanvas,
      resetZoom,
      toggleSnapToGrid,
      undo,
      ungroupSelectedNodes,
      zoomIn,
      zoomOut,
    ],
  );

  const filteredCommands = commands.filter((command) => {
    const searchText = `${command.title} ${command.description}`.toLowerCase();

    return searchText.includes(query.trim().toLowerCase());
  });

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      const isCommandShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

      if (!isCommandShortcut) {
        return;
      }

      event.preventDefault();
      setIsOpen((current) => !current);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  function runCommand(command: Command): void {
    command.action();
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-3 rounded-2xl border border-slate-200 bg-white/92 px-4 py-2 text-xs font-bold text-slate-700 shadow-2xl backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950/92 dark:text-slate-200 lg:flex"
      >
        <span className="text-slate-500">Command Palette</span>
        <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 font-black dark:border-slate-800 dark:bg-slate-900">
          ⌘K
        </span>
      </button>

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="RainbowCode command palette"
          className="fixed inset-0 z-[100] grid place-items-start bg-slate-950/48 px-4 py-20 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              setIsOpen(false);
            }
          }}
        >
          <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/20 bg-white shadow-[0_34px_140px_rgba(0,0,0,0.35)] dark:bg-slate-950">
            <div className="border-b border-slate-200 p-4 dark:border-slate-800">
              <label htmlFor="command-palette-search" className="sr-only">
                Search RainbowCode commands
              </label>
              <input
                id="command-palette-search"
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setIsOpen(false);
                  }

                  if (event.key === "Enter" && filteredCommands[0] !== undefined) {
                    runCommand(filteredCommands[0]);
                  }
                }}
                placeholder="Search commands, templates, actions..."
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div className="max-h-[460px] overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-sm font-black text-slate-950 dark:text-white">
                    No commands found
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Try searching for template, zoom, group, or export.
                  </p>
                </div>
              ) : (
                filteredCommands.map((command) => (
                  <button
                    key={command.id}
                    type="button"
                    onClick={() => runCommand(command)}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-3 text-left transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-slate-900"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-black text-slate-950 dark:text-white">
                        {command.title}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-slate-500">
                        {command.description}
                      </span>
                    </span>

                    {command.shortcut === undefined ? null : (
                      <span className="shrink-0 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-black text-slate-500 dark:border-slate-800 dark:bg-slate-900">
                        {command.shortcut}
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}