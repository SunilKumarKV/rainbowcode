import { describe, expect, it } from "vitest";
import { defaultTheme } from "@/features/theme-engine/constants/default-theme";
import { exportJsonTheme } from "@/features/theme-engine/exporters/export-json";

describe("exportJsonTheme", () => {
  it("exports resolved theme JSON", () => {
    const output = exportJsonTheme(defaultTheme);
    const parsed = JSON.parse(output) as typeof defaultTheme;

    expect(parsed.version).toBe("1.0.0");
    expect(parsed.colors.primary).toBe("#2563eb");
  });
});