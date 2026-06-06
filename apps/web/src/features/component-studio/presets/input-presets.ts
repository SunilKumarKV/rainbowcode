import type { InputDefinition } from "@/features/component-studio/types/component-definition";

export type InputPreset = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly definition: InputDefinition;
};

export const inputPresets: readonly InputPreset[] = [
  {
    id: "email-input",
    name: "Email Input",
    description: "Standard email capture field.",
    definition: {
      type: "input",
      label: "Email address",
      placeholder: "you@example.com",
      helperText: "We'll never share your email.",
      variant: "default",
      size: "md",
      radius: "md",
      disabled: false,
    },
  },
  {
    id: "search-input",
    name: "Search Input",
    description: "Search box for dashboards and docs.",
    definition: {
      type: "input",
      label: "Search",
      placeholder: "Search components...",
      helperText: "Type a keyword to search.",
      variant: "filled",
      size: "md",
      radius: "xl",
      disabled: false,
    },
  },
  {
    id: "newsletter-input",
    name: "Newsletter Input",
    description: "Large marketing signup field.",
    definition: {
      type: "input",
      label: "Join newsletter",
      placeholder: "Enter your email",
      helperText: "Get product updates and design tips.",
      variant: "outline",
      size: "lg",
      radius: "lg",
      disabled: false,
    },
  },
  {
    id: "disabled-input",
    name: "Disabled Input",
    description: "Disabled state preview.",
    definition: {
      type: "input",
      label: "Username",
      placeholder: "sunil_dev",
      helperText: "This field is currently locked.",
      variant: "default",
      size: "md",
      radius: "md",
      disabled: true,
    },
  },
];