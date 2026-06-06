"use client";

import { Button } from "@/components/ui/button";
import { exportButtonComponent } from "@/features/component-studio/exporters/export-button-component";
import { exportCardComponent } from "@/features/component-studio/exporters/export-card-component";
import { exportInputComponent } from "@/features/component-studio/exporters/export-input-component";
import { generateButtonCode } from "@/features/component-studio/generators/button-generator";
import { generateCardCode } from "@/features/component-studio/generators/card-generator";
import { generateInputCode } from "@/features/component-studio/generators/input-generator";
import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";
import { downloadFile } from "@/features/theme-engine/exporters/download-file";
import { useAppShellStore } from "@/stores/app-shell-store";

export function CodePanel() {
  const isCodePanelOpen = useAppShellStore((state) => state.isCodePanelOpen);
  const toggleCodePanel = useAppShellStore((state) => state.toggleCodePanel);
  const selectedComponent = useComponentStudioStore(
    (state) => state.selectedComponent,
  );
  const buttonDefinition = useComponentStudioStore(
    (state) => state.buttonDefinition,
  );
  const cardDefinition = useComponentStudioStore((state) => state.cardDefinition);
  const inputDefinition = useComponentStudioStore(
    (state) => state.inputDefinition,
  );

  const generatedCode =
    selectedComponent === "button"
      ? generateButtonCode(buttonDefinition)
      : selectedComponent === "card"
        ? generateCardCode(cardDefinition)
        : generateInputCode(inputDefinition);

  async function copyCode(): Promise<void> {
    await navigator.clipboard.writeText(generatedCode);
  }

  function exportComponent(): void {
    if (selectedComponent === "button") {
      downloadFile(
        "rainbow-button.tsx",
        exportButtonComponent(buttonDefinition),
        "text/typescript",
      );
      return;
    }

    if (selectedComponent === "card") {
      downloadFile(
        "rainbow-card.tsx",
        exportCardComponent(cardDefinition),
        "text/typescript",
      );
      return;
    }

    downloadFile(
      "rainbow-input.tsx",
      exportInputComponent(inputDefinition),
      "text/typescript",
    );
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
          <Button variant="secondary" onClick={exportComponent}>
            Export
          </Button>
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