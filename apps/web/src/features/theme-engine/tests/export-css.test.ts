import { describe, expect, it } from "vitest";
import { defaultTheme } from "@/features/theme-engine/constants/default-theme";
import { exportCssTheme } from "@/features/theme-engine/exporters/export-css";

describe("exportCssTheme", () => {
  it("exports CSS variables", () => {
    const output = exportCssTheme(defaultTheme);

    expect(output).toContain(":root");
    expect(output).toContain("--color-primary: #2563eb;");
    expect(output).toContain("--radius-md: 0.75rem;");
  });
});