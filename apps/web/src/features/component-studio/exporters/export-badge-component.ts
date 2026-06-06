import { generateBadgeCode } from "@/features/component-studio/generators/badge-generator";
import type { BadgeDefinition } from "@/features/component-studio/types/component-definition";
import { formatGeneratedCode } from "@/features/component-studio/utils/format-generated-code";

export function exportBadgeComponent(definition: BadgeDefinition): string {
  const badgeCode = generateBadgeCode(definition);

  return formatGeneratedCode(`export function RainbowBadge() {
  return (
    ${badgeCode}
  );
}`);
}