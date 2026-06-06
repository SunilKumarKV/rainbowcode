"use client";

import { Button } from "@/components/ui/button";
import { useAppShellStore } from "@/stores/app-shell-store";

export function CodePanel() {
  const generatedCode = useAppShellStore((state) => state.generatedCode);
  const isCodePanelOpen = useAppShellStore((state) => state.isCodePanelOpen);
  const toggleCodePanel = useAppShellStore((state) => state.toggleCodePanel);

  async function copyCode(): Promise<void> {
    await navigator.clipboard.writeText(generatedCode);
  }

  return (
    <section
      aria-label="Generated code panel"
      className="border-t border-slate-200 bg-slate-950 text-white dark:border-slate-800"
    >
      <div className="flex h-12 items-center justify-between px-4">
        <h2 className="text-sm font-semibold">Generated Code</h2>

        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={copyCode}>
            Copy
          </Button>
          <Button variant="secondary">Export</Button>
          <Button variant="ghost" onClick={toggleCodePanel}>
            {isCodePanelOpen ? "Hide" : "Show"}
          </Button>
        </div>
      </div>

      {isCodePanelOpen ? (
        <pre
          aria-live="polite"
          className="max-h-56 overflow-auto border-t border-slate-800 p-4 text-sm"
        >
          <code>{generatedCode}</code>
        </pre>
      ) : null}
    </section>
  );
}