import { describe, expect, it } from "vitest";
import { exportTypographyCss } from "@/features/brand-studio/exporters/export-typography-css";
import { defaultTypographySystem } from "@/features/brand-studio/store/typography-store";

describe("exportTypographyCss", () => {
  it("exports typography css variables", () => {
    const css = exportTypographyCss(defaultTypographySystem);

    expect(css).toContain("--rbc-font-heading");
    expect(css).toContain("--rbc-font-body");
    expect(css).toContain("--rbc-text-4xl");
    expect(css).toContain("Inter");
  });
});