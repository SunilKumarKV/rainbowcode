import { describe, expect, it } from "vitest";
import { defaultTheme } from "@/features/theme-engine/constants/default-theme";
import { exportTailwindTheme } from "@/features/theme-engine/exporters/export-tailwind";

describe("exportTailwindTheme", () => {
  it("exports generated Tailwind theme as TypeScript tokens", () => {
    const output = exportTailwindTheme(defaultTheme);

    expect(output).toContain("export const tailwindTokens =");
    expect(output).toContain('"primary": "#2563eb"');
    expect(output).toContain('"md": "0.75rem"');
    expect(output).toContain("export default tailwindTokens;");
  });
});
