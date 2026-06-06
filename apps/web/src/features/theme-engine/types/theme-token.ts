export type ThemeVersion = "1.0.0";

export type ThemeColorKey =
  | "primary"
  | "secondary"
  | "background"
  | "foreground"
  | "success"
  | "warning"
  | "destructive";

export type ThemeTokens = {
  readonly version: ThemeVersion;
  readonly colors: Record<ThemeColorKey, string>;
  readonly typography: {
    readonly fontFamily: string;
    readonly fontSizeBase: string;
    readonly lineHeightBase: string;
  };
  readonly radius: {
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
    readonly xl: string;
  };
  readonly spacing: {
    readonly xs: string;
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
    readonly xl: string;
  };
};