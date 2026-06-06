import { describe, expect, it } from "vitest";
import { defaultTheme } from "@/features/theme-engine/constants/default-theme";
import { generateTailwindTheme } from "@/features/theme-engine/generators/tailwind-generator";

describe("generateTailwindTheme", () => {
  it("generates Tailwind color tokens", () => {
    const tailwindTheme = generateTailwindTheme(defaultTheme);

    expect(tailwindTheme.colors.primary).toBe("#2563eb");
    expect(tailwindTheme.colors.secondary).toBe("#7c3aed");
    expect(tailwindTheme.colors.background).toBe("#ffffff");
  });

  it("generates Tailwind radius and spacing tokens", () => {
    const tailwindTheme = generateTailwindTheme(defaultTheme);

    expect(tailwindTheme.borderRadius.md).toBe("0.75rem");
    expect(tailwindTheme.spacing.lg).toBe("1.5rem");
  });

  it("generates Tailwind typography tokens", () => {
    const tailwindTheme = generateTailwindTheme(defaultTheme);

    expect(tailwindTheme.fontFamily.sans).toEqual([
      "Inter, system-ui, sans-serif",
    ]);
    expect(tailwindTheme.fontSize.base).toBe("1rem");
    expect(tailwindTheme.lineHeight.base).toBe("1.5");
  });
});