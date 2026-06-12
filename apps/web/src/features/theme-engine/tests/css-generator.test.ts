import { describe, expect, it } from "vitest";
import { defaultTheme } from "@/features/theme-engine/constants/default-theme";
import { generateCssVariables } from "@/features/theme-engine/generators/css-generator";

describe("generateCssVariables", () => {
  it("generates color CSS variables", () => {
    const css = generateCssVariables(defaultTheme);

    expect(css).toContain("--color-primary: #2563eb;");
    expect(css).toContain("--color-secondary: #7c3aed;");
    expect(css).toContain("--color-background: #ffffff;");
  });

  it("generates radius and spacing CSS variables", () => {
    const css = generateCssVariables(defaultTheme);

    expect(css).toContain("--radius-md: 0.75rem;");
    expect(css).toContain("--spacing-lg: 1.5rem;");
  });

  it("generates typography CSS variables", () => {
    const css = generateCssVariables(defaultTheme);

    expect(css).toContain("--font-family-base: Inter, system-ui, sans-serif;");
    expect(css).toContain("--font-size-base: 1rem;");
    expect(css).toContain("--line-height-base: 1.5;");
  });

  it("generates derived semantic variables for shared UI", () => {
    const css = generateCssVariables(defaultTheme);

    expect(css).toContain("--surface-panel: rgba(255, 255, 255, 0.84);");
    expect(css).toContain("--surface-card: rgba(255, 255, 255, 0.78);");
    expect(css).toContain("--theme-focus-ring: #2563eb;");
    expect(css).toContain("--surface-on-primary: #ffffff;");
  });
});
