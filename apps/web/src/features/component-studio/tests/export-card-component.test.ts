import { describe, expect, it } from "vitest";
import { exportCardComponent } from "@/features/component-studio/exporters/export-card-component";
import { defaultCardDefinition } from "@/features/component-studio/registry/card-definition";

describe("exportCardComponent", () => {
  it("exports a React card component string", () => {
    const output = exportCardComponent(defaultCardDefinition);

    expect(output).toContain("export function RainbowCard()");
    expect(output).toContain("<article");
    expect(output).toContain("Build faster with RainbowCode");
    expect(output).toContain("rounded-[var(--radius-xl)]");
  });
});