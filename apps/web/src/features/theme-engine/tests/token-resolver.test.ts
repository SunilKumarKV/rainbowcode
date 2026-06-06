import { describe, expect, it } from "vitest";
import { defaultTheme } from "@/features/theme-engine/constants/default-theme";
import { resolveThemeTokens } from "@/features/theme-engine/resolvers/token-resolver";

describe("resolveThemeTokens", () => {
  it("returns a valid resolved theme", () => {
    const resolvedTheme = resolveThemeTokens(defaultTheme);

    expect(resolvedTheme.version).toBe("1.0.0");
    expect(resolvedTheme.colors.primary).toBe("#2563eb");
  });

  it("does not mutate the original theme object", () => {
    const resolvedTheme = resolveThemeTokens(defaultTheme);

    expect(resolvedTheme).toEqual(defaultTheme);
    expect(resolvedTheme).not.toBe(defaultTheme);
  });
});