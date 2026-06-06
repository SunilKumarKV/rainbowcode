import { generateInputCode } from "@/features/component-studio/generators/input-generator";
import type { InputDefinition } from "@/features/component-studio/types/component-definition";

export function exportInputComponent(definition: InputDefinition): string {
  const inputCode = generateInputCode(definition);

  return `export function RainbowInput() {
  return (
    ${inputCode}
  );
}
`;
}