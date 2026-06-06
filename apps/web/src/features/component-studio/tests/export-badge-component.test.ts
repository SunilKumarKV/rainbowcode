import { describe, expect, it } from "vitest";
import { exportBadgeComponent } from "@/features/component-studio/exporters/export-badge-component";
import { defaultBadgeDefinition } from "@/features/component-studio/registry/badge-definition";

describe("exportBadgeComponent", () => {
  it("exports a React badge component string", () => {
    const output = exportBadgeComponent(defaultBadgeDefinition);

    expect(output).toContain("export function RainbowBadge()");
    expect(output).toContain("<span");
    expect(output).toContain("New");
    expect(output).toContain("rounded-[var(--radius-xl)]");
  });
});