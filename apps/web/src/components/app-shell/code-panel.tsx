"use client";

import { Button } from "@/components/ui/button";
import { generateButtonCode } from "@/features/component-studio/generators/button-generator";
import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";
import { useAppShellStore } from "@/stores/app-shell-store";

export function CodePanel() {
  const isCodePanelOpen = useAppShellStore((state) => state.isCodePanelOpen);
  const toggleCodePanel = useAppShellStore((state) => state.toggleCodePanel);
  const buttonDefinition = useComponentStudioStore(
    (state) => state.buttonDefinition,
  );

  const generatedCode = generateButtonCode(buttonDefinition);

  async function copyCode(): Promise<void> {
    await navigator.clipboard.writeText(generatedCode);
  }

  return (
    <section
      aria-label="Generated code panel"
      className="shrink-0 border-t border-slate-800 bg-slate-950 text-white"
    >
      <div className="flex h-12 items-center justify-between gap-3 px-4">
        <div>
          <h2 className="text-sm font-semibold">Generated Code</h2>
          <p className="hidden text-xs text-slate-400 sm:block">
            React + Tailwind output preview
          </p>
        </div>

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
          className="max-h-56 overflow-auto border-t border-slate-800 bg-slate-900 p-4 text-sm leading-6 text-slate-100"
        >
          <code>{generatedCode}</code>
        </pre>
      ) : null}
    </section>
  );
}