import type { ButtonDefinition } from "@/features/component-studio/types/component-definition";

export type ButtonPreset = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly definition: ButtonDefinition;
};

export const buttonPresets: readonly ButtonPreset[] = [
  {
    id: "primary-cta",
    name: "Primary CTA",
    description: "Strong call-to-action button.",
    definition: {
      type: "button",
      label: "Get Started",
      variant: "primary",
      size: "md",
      radius: "md",
    },
  },
  {
    id: "secondary-action",
    name: "Secondary Action",
    description: "Supportive secondary action.",
    definition: {
      type: "button",
      label: "Learn More",
      variant: "secondary",
      size: "md",
      radius: "lg",
    },
  },
  {
    id: "outline-ghost",
    name: "Outline Ghost",
    description: "Lightweight outline style.",
    definition: {
      type: "button",
      label: "View Details",
      variant: "outline",
      size: "sm",
      radius: "xl",
    },
  },
  {
    id: "large-launch",
    name: "Large Launch",
    description: "Large hero section button.",
    definition: {
      type: "button",
      label: "Launch App",
      variant: "primary",
      size: "lg",
      radius: "xl",
    },
  },
];