import { describe, expect, it } from "vitest";
import { exportComponentBundle } from "@/features/component-studio/exporters/export-component-bundle";
import { defaultBadgeDefinition } from "@/features/component-studio/registry/badge-definition";
import { defaultButtonDefinition } from "@/features/component-studio/registry/button-definition";
import { defaultCardDefinition } from "@/features/component-studio/registry/card-definition";
import { defaultInputDefinition } from "@/features/component-studio/registry/input-definition";

describe("exportComponentBundle", () => {
  it("exports all component files and index", () => {
    const files = exportComponentBundle({
      buttonDefinition: defaultButtonDefinition,
      cardDefinition: defaultCardDefinition,
      inputDefinition: defaultInputDefinition,
      badgeDefinition: defaultBadgeDefinition,
    });

    expect(files).toHaveLength(5);
    expect(files.map((file) => file.filename)).toEqual([
      "rainbow-button.tsx",
      "rainbow-card.tsx",
      "rainbow-input.tsx",
      "rainbow-badge.tsx",
      "index.ts",
    ]);
  });

  it("includes generated component content", () => {
    const files = exportComponentBundle({
      buttonDefinition: defaultButtonDefinition,
      cardDefinition: defaultCardDefinition,
      inputDefinition: defaultInputDefinition,
      badgeDefinition: defaultBadgeDefinition,
    });

    expect(files[0]?.content).toContain("RainbowButton");
    expect(files[1]?.content).toContain("RainbowCard");
    expect(files[2]?.content).toContain("RainbowInput");
    expect(files[3]?.content).toContain("RainbowBadge");
    expect(files[4]?.content).toContain("RainbowButton");
  });
});