import { describe, expect, it } from "vitest";
import { defaultTheme } from "@/features/theme-engine/constants/default-theme";
import { exportTailwindTheme } from "@/features/theme-engine/exporters/export-tailwind";

type ExportedTailwindTheme = {
  readonly colors: {
    readonly primary: string;
  };
  readonly borderRadius: {
    readonly md: string;
  };
};

describe("exportTailwindTheme", () => {
  it("exports generated Tailwind theme JSON", () => {
    const output = exportTailwindTheme(defaultTheme);
    const parsed = JSON.parse(output) as ExportedTailwindTheme;

    expect(parsed.colors.primary).toBe("#2563eb");
    expect(parsed.borderRadius.md).toBe("0.75rem");
  });
});