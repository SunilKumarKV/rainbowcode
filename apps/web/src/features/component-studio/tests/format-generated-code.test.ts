import { describe, expect, it } from "vitest";
import { formatGeneratedCode } from "@/features/component-studio/utils/format-generated-code";

describe("formatGeneratedCode", () => {
  it("trims code and adds a final newline", () => {
    const output = formatGeneratedCode("  export function Demo() {}\n\n");

    expect(output).toBe("export function Demo() {}\n");
  });
});