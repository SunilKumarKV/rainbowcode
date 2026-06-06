import { describe, expect, it } from "vitest";
import { exportComponentIndex } from "@/features/component-studio/exporters/export-component-index";

describe("exportComponentIndex", () => {
  it("exports all generated component names", () => {
    const output = exportComponentIndex();

    expect(output).toContain('export { RainbowButton } from "./rainbow-button";');
    expect(output).toContain('export { RainbowCard } from "./rainbow-card";');
    expect(output).toContain('export { RainbowInput } from "./rainbow-input";');
    expect(output).toContain('export { RainbowBadge } from "./rainbow-badge";');
  });
});