import { describe, expect, it, beforeEach } from "vitest";
import { defaultTheme } from "@/features/theme-engine/constants/default-theme";
import {
  applyTheme,
  getThemeCssVariables,
} from "@/features/theme-engine/runtime/apply-theme";

describe("getThemeCssVariables", () => {
  it("returns generated CSS variable entries", () => {
    const variables = getThemeCssVariables(defaultTheme);

    expect(variables).toContainEqual(["--color-primary", "#2563eb"]);
    expect(variables).toContainEqual(["--radius-md", "0.75rem"]);
    expect(variables).toContainEqual(["--spacing-lg", "1.5rem"]);
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
});