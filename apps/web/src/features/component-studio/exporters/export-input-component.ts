import { generateInputCode } from "@/features/component-studio/generators/input-generator";
import type { InputDefinition } from "@/features/component-studio/types/component-definition";
import { formatGeneratedCode } from "@/features/component-studio/utils/format-generated-code";

export function exportInputComponent(definition: InputDefinition): string {
  const inputCode = generateInputCode(definition);

  return formatGeneratedCode(`export function RainbowInput() {
  return (
    ${inputCode}
  );
}`);
}