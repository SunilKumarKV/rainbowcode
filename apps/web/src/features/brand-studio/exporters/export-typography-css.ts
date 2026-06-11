import type { BrandTypographySystem } from "@/features/brand-studio/types/typography";

export function exportTypographyCss(typography: BrandTypographySystem): string {
  return `:root {
  --rbc-font-heading: "${typography.headingFont}", system-ui, sans-serif;
  --rbc-font-body: "${typography.bodyFont}", system-ui, sans-serif;
  --rbc-font-heading-weight: ${typography.headingWeight};
  --rbc-font-body-weight: ${typography.bodyWeight};
  --rbc-line-height: ${typography.lineHeight};
  --rbc-letter-spacing: ${typography.letterSpacing}em;

  --rbc-text-xs: ${typography.scale.xs};
  --rbc-text-sm: ${typography.scale.sm};
  --rbc-text-base: ${typography.scale.base};
  --rbc-text-lg: ${typography.scale.lg};
  --rbc-text-xl: ${typography.scale.xl};
  --rbc-text-2xl: ${typography.scale["2xl"]};
  --rbc-text-3xl: ${typography.scale["3xl"]};
  --rbc-text-4xl: ${typography.scale["4xl"]};
}
`;
}