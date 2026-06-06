import { describe, expect, it } from "vitest";
import { getComponentMetadata } from "@/features/component-studio/utils/component-labels";

describe("getComponentMetadata", () => {
  it("returns button metadata", () => {
    const metadata = getComponentMetadata("button");

    expect(metadata.label).toBe("Button");
    expect(metadata.exportFilename).toBe("rainbow-button.tsx");
  });

  it("returns card metadata", () => {
    const metadata = getComponentMetadata("card");

    expect(metadata.label).toBe("Card");
    expect(metadata.exportFilename).toBe("rainbow-card.tsx");
  });

  it("returns input metadata", () => {
    const metadata = getComponentMetadata("input");

    expect(metadata.label).toBe("Input");
    expect(metadata.exportFilename).toBe("rainbow-input.tsx");
  });

  it("returns badge metadata", () => {
    const metadata = getComponentMetadata("badge");

    expect(metadata.label).toBe("Badge");
    expect(metadata.exportFilename).toBe("rainbow-badge.tsx");
  });
});