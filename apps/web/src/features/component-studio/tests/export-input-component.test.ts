import { describe, expect, it } from "vitest";
import { exportInputComponent } from "@/features/component-studio/exporters/export-input-component";
import { defaultInputDefinition } from "@/features/component-studio/registry/input-definition";

describe("exportInputComponent", () => {
  it("exports a React input component string", () => {
    const output = exportInputComponent(defaultInputDefinition);

    expect(output).toContain("export function RainbowInput()");
    expect(output).toContain("<input");
    expect(output).toContain("Email address");
    expect(output).toContain("rounded-[var(--radius-md)]");
  });
});