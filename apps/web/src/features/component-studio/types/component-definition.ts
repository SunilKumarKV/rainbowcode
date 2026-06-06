export type ComponentType = "button" | "card";

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

export type CardVariant = "simple" | "feature" | "pricing";

export type CardRadius = "sm" | "md" | "lg" | "xl";

export type CardDefinition = {
  readonly type: "card";
  readonly title: string;
  readonly description: string;
  readonly variant: CardVariant;
  readonly radius: CardRadius;
  readonly showAction: boolean;
  readonly actionLabel: string;
};

export type ComponentDefinition = ButtonDefinition | CardDefinition;