import { formatGeneratedCode } from "@/features/component-studio/utils/format-generated-code";

export function exportComponentIndex(): string {
  return formatGeneratedCode(`export { RainbowButton } from "./rainbow-button";
export { RainbowCard } from "./rainbow-card";
export { RainbowInput } from "./rainbow-input";
export { RainbowBadge } from "./rainbow-badge";`);
}