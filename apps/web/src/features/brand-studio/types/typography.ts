export type BrandFontFamily =
  | "Inter"
  | "Poppins"
  | "Montserrat"
  | "Playfair Display"
  | "Space Grotesk"
  | "System UI";

export type BrandTypographyScale = {
  readonly xs: string;
  readonly sm: string;
  readonly base: string;
  readonly lg: string;
  readonly xl: string;
  readonly "2xl": string;
  readonly "3xl": string;
  readonly "4xl": string;
};

export type BrandTypographySystem = {
  readonly headingFont: BrandFontFamily;
  readonly bodyFont: BrandFontFamily;
  readonly headingWeight: number;
  readonly bodyWeight: number;
  readonly lineHeight: number;
  readonly letterSpacing: number;
  readonly scale: BrandTypographyScale;
};