"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";
import { studioNavItems } from "@/lib/navigation/studio-nav";
import { useAppShellStore } from "@/stores/app-shell-store";

type Command = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly shortcut?: string;
  readonly action: () => void;
};

export function CommandPalette() {
  const router = useRouter();
  const isOpen = useAppShellStore((state) => state.isCommandPaletteOpen);
  const openCommandPalette = useAppShellStore(
    (state) => state.openCommandPalette,
  );
  const closeCommandPalette = useAppShellStore(
    (state) => state.closeCommandPalette,
  );
  const toggleCommandPalette = useAppShellStore(
    (state) => state.toggleCommandPalette,
  );
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
      ...studioNavItems.map((item) => ({
        id: `open-${item.studio}`,
        title: `Open ${item.label}`,
        description: item.description,
        action: () => router.push(item.href),
      })),
      {
        id: "template-hero",
        title: "Apply Feature Intro Layout",
        description: "Replace canvas with a reusable intro section layout.",
        action: () => applyTemplate("hero"),
      },
      {
        id: "template-pricing",
        title: "Apply Detail Card Layout",
        description: "Replace canvas with a reusable detail card layout.",
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
      router,
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
      toggleCommandPalette();
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
    closeCommandPalette();
  }

  return (
    <>
      <button
        type="button"
        onClick={openCommandPalette}
        className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-3 rounded-2xl border border-[var(--theme-border-soft)] bg-[var(--surface-panel)] px-4 py-2 text-xs font-bold text-[var(--surface-foreground)] shadow-[var(--shadow-medium)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-[var(--surface-panel-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-focus-ring)] lg:flex"
      >
        <span className="text-[var(--theme-text-muted)]">Command Palette</span>
        <span className="rounded-lg border border-[var(--theme-border-soft)] bg-[var(--surface-muted)] px-2 py-1 font-black">
          ⌘K
        </span>
      </button>

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="RainbowCode command palette"
          className="fixed inset-0 z-[100] grid place-items-start bg-[rgba(2,6,23,0.48)] px-4 py-20 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              closeCommandPalette();
            }
          }}
        >
          <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-[28px] border border-[var(--theme-border-soft)] bg-[var(--surface-panel-strong)] shadow-[var(--shadow-strong)]">
            <div className="border-b border-[var(--theme-border-soft)] p-4">
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
                    closeCommandPalette();
                  }

                  if (event.key === "Enter" && filteredCommands[0] !== undefined) {
                    runCommand(filteredCommands[0]);
                  }
                }}
                placeholder="Search commands, templates, actions..."
                className="rbc-field h-12 w-full rounded-2xl px-4 text-sm font-semibold outline-none transition placeholder:text-[var(--theme-text-subtle)]"
              />
            </div>

            <div className="max-h-[460px] overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-sm font-black text-[var(--surface-foreground)]">
                    No commands found
                  </p>
                  <p className="mt-2 text-xs text-[var(--theme-text-muted)]">
                    Try searching for template, zoom, group, or export.
                  </p>
                </div>
              ) : (
                filteredCommands.map((command) => (
                  <button
                    key={command.id}
                    type="button"
                    onClick={() => runCommand(command)}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-3 text-left transition hover:bg-[var(--surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-focus-ring)]"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-black text-[var(--surface-foreground)]">
                        {command.title}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-[var(--theme-text-muted)]">
                        {command.description}
                      </span>
                    </span>

                    {command.shortcut === undefined ? null : (
                      <span className="shrink-0 rounded-lg border border-[var(--theme-border-soft)] bg-[var(--surface-muted)] px-2 py-1 text-xs font-black text-[var(--theme-text-muted)]">
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
