import { generateCanvasCode } from "@/features/canvas-studio/generators/canvas-code-generator";
import type { CanvasNode } from "@/features/canvas-studio/types/canvas-node";
import { formatGeneratedCode } from "@/features/component-studio/utils/format-generated-code";

export function exportCanvasComponent(nodes: readonly CanvasNode[]): string {
  const canvasCode = generateCanvasCode(nodes);

  return formatGeneratedCode(`export function RainbowCanvas() {
  return (
    ${canvasCode}
  );
}`);
}