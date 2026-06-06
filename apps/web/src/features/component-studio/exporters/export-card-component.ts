import { generateCardCode } from "@/features/component-studio/generators/card-generator";
import type { CardDefinition } from "@/features/component-studio/types/component-definition";

export function exportCardComponent(definition: CardDefinition): string {
  const cardCode = generateCardCode(definition);

  return `export function RainbowCard() {
  return (
    ${cardCode}
  );
}
`;
}