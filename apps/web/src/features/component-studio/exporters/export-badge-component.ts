import { generateBadgeCode } from "@/features/component-studio/generators/badge-generator";
import type { BadgeDefinition } from "@/features/component-studio/types/component-definition";

export function exportBadgeComponent(definition: BadgeDefinition): string {
  const badgeCode = generateBadgeCode(definition);

  return `export function RainbowBadge() {
  return (
    ${badgeCode}
  );
}
`;
}