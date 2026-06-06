import { generateCardCode } from "@/features/component-studio/generators/card-generator";
import type { CardDefinition } from "@/features/component-studio/types/component-definition";
import { formatGeneratedCode } from "@/features/component-studio/utils/format-generated-code";

export function exportCardComponent(definition: CardDefinition): string {
  const cardCode = generateCardCode(definition);

  return formatGeneratedCode(`export function RainbowCard() {
  return (
    ${cardCode}
  );
}`);
}