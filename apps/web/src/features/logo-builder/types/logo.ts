export type LogoFontFamily =
  | "Inter"
  | "Poppins"
  | "Montserrat"
  | "Playfair Display"
  | "Space Grotesk";

export type LogoGradientDirection =
  | "to-right"
  | "to-bottom-right"
  | "to-bottom"
  | "to-top-right";

export type LogoConfig = {
  readonly text: string;
  readonly tagline: string;
  readonly fontFamily: LogoFontFamily;
  readonly fontWeight: number;
  readonly letterSpacing: number;
  readonly primaryColor: string;
  readonly secondaryColor: string;
  readonly backgroundColor: string;
  readonly gradientDirection: LogoGradientDirection;
  readonly radius: number;
};