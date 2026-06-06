import { generateButtonCode } from "@/features/component-studio/generators/button-generator";
import type { ButtonDefinition } from "@/features/component-studio/types/component-definition";
import { formatGeneratedCode } from "@/features/component-studio/utils/format-generated-code";

export function exportButtonComponent(definition: ButtonDefinition): string {
  const buttonCode = generateButtonCode(definition);

  return formatGeneratedCode(`export function RainbowButton() {
  return (
    ${buttonCode}
  );
}`);
}