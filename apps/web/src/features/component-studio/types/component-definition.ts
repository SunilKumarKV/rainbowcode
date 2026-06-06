export type ComponentType = "button";

export type ButtonVariant = "primary" | "secondary" | "outline";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonRadius = "sm" | "md" | "lg" | "xl";

export type ButtonDefinition = {
  readonly type: "button";
  readonly label: string;
  readonly variant: ButtonVariant;
  readonly size: ButtonSize;
  readonly radius: ButtonRadius;
};

export type ComponentDefinition = ButtonDefinition;