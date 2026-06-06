import type { InputDefinition } from "@/features/component-studio/types/component-definition";

export const defaultInputDefinition: InputDefinition = {
  type: "input",
  label: "Email address",
  placeholder: "you@example.com",
  helperText: "We'll never share your email.",
  variant: "default",
  size: "md",
  radius: "md",
  disabled: false,
};