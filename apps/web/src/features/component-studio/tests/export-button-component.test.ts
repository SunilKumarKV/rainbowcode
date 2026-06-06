import { describe, expect, it } from "vitest";
import { exportButtonComponent } from "@/features/component-studio/exporters/export-button-component";
import { defaultButtonDefinition } from "@/features/component-studio/registry/button-definition";

describe("exportButtonComponent", () => {
  it("exports a React component string", () => {
    const output = exportButtonComponent(defaultButtonDefinition);

    expect(output).toContain("export function RainbowButton()");
    expect(output).toContain("<button");
    expect(output).toContain("Get Started");
    expect(output).toContain("bg-[var(--color-primary)]");
  });
});