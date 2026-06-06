import type { ComponentType } from "@/features/component-studio/types/component-definition";

export type ComponentMetadata = {
  readonly label: string;
  readonly description: string;
  readonly exportFilename: string;
};

export const componentMetadata: Record<ComponentType, ComponentMetadata> = {
  button: {
    label: "Button",
    description: "Create clickable actions powered by theme tokens.",
    exportFilename: "rainbow-button.tsx",
  },
  card: {
    label: "Card",
    description: "Create content containers for dashboards and marketing UI.",
    exportFilename: "rainbow-card.tsx",
  },
  input: {
    label: "Input",
    description: "Create accessible form inputs with token-driven styling.",
    exportFilename: "rainbow-input.tsx",
  },
  badge: {
    label: "Badge",
    description: "Create compact labels, statuses, and product tags.",
    exportFilename: "rainbow-badge.tsx",
  },
};

export function getComponentMetadata(
  componentType: ComponentType,
): ComponentMetadata {
  return componentMetadata[componentType];
}