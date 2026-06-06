export type ComponentType = "button" | "card" | "input" | "badge";

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

export type InputVariant = "default" | "filled" | "outline";

export type InputSize = "sm" | "md" | "lg";

export type InputRadius = "sm" | "md" | "lg" | "xl";

export type InputDefinition = {
  readonly type: "input";
  readonly label: string;
  readonly placeholder: string;
  readonly helperText: string;
  readonly variant: InputVariant;
  readonly size: InputSize;
  readonly radius: InputRadius;
  readonly disabled: boolean;
};

export type BadgeVariant = "primary" | "secondary" | "success" | "warning" | "destructive" | "outline";

export type BadgeSize = "sm" | "md" | "lg";

export type BadgeRadius = "sm" | "md" | "lg" | "xl";

export type BadgeDefinition = {
  readonly type: "badge";
  readonly label: string;
  readonly variant: BadgeVariant;
  readonly size: BadgeSize;
  readonly radius: BadgeRadius;
};

export type ComponentDefinition =
  | ButtonDefinition
  | CardDefinition
  | InputDefinition
  | BadgeDefinition;