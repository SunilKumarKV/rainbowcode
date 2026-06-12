import { describe, expect, it, beforeEach } from "vitest";
import { defaultTheme } from "@/features/theme-engine/constants/default-theme";
import {
  applyTheme,
  getThemeCssVariables,
} from "@/features/theme-engine/runtime/apply-theme";
import { themeSchema } from "@/features/theme-engine/validation/theme-schema";

describe("getThemeCssVariables", () => {
  it("returns generated CSS variable entries", () => {
    const variables = getThemeCssVariables(defaultTheme);

    expect(variables).toContainEqual(["--color-primary", "#2563eb"]);
    expect(variables).toContainEqual(["--radius-md", "0.75rem"]);
    expect(variables).toContainEqual(["--spacing-lg", "1.5rem"]);
    expect(variables).toContainEqual(["--surface-panel", "rgba(255, 255, 255, 0.84)"]);
    expect(variables).toContainEqual(["--theme-focus-ring", "#2563eb"]);
    expect(variables).toContainEqual(["--surface-on-primary", "#ffffff"]);
  });

  it("keeps the default theme schema-valid", () => {
    expect(themeSchema.parse(defaultTheme)).toEqual(defaultTheme);
  });
});

describe("applyTheme", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("style");
  });

  it("applies color variables to document root", () => {
    applyTheme(defaultTheme);

    expect(document.documentElement.style.getPropertyValue("--color-primary")).toBe(
      "#2563eb",
    );
    expect(
      document.documentElement.style.getPropertyValue("--color-secondary"),
    ).toBe("#7c3aed");
  });

  it("applies radius and spacing variables to document root", () => {
    applyTheme(defaultTheme);

    expect(document.documentElement.style.getPropertyValue("--radius-md")).toBe(
      "0.75rem",
    );
    expect(document.documentElement.style.getPropertyValue("--spacing-lg")).toBe(
      "1.5rem",
    );
  });

  it("applies derived semantic variables to document root", () => {
    applyTheme(defaultTheme);

    expect(document.documentElement.style.getPropertyValue("--surface-panel")).toBe(
      "rgba(255, 255, 255, 0.84)",
    );
    expect(document.documentElement.style.getPropertyValue("--theme-focus-ring")).toBe(
      "#2563eb",
    );
    expect(
      document.documentElement.style.getPropertyValue("--surface-on-primary"),
    ).toBe("#ffffff");
  });
});
