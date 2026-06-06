import { generateButtonCode } from "@/features/component-studio/generators/button-generator";
import type { ButtonDefinition } from "@/features/component-studio/types/component-definition";

export function exportButtonComponent(definition: ButtonDefinition): string {
  const buttonCode = generateButtonCode(definition);

  return `export function RainbowButton() {
  return (
    ${buttonCode}
  );
}
`;
}