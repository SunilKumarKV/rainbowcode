import { describe, expect, it } from "vitest";
import { exportBrandJson } from "@/features/brand-studio/exporters/export-brand-json";
import { defaultBrandKit } from "@/features/brand-studio/store/brand-store";

describe("exportBrandJson", () => {
  it("exports brand kit as formatted json", () => {
    const result = exportBrandJson(defaultBrandKit);
    const parsed = JSON.parse(result) as {
      readonly $schema: string;
      readonly brand: typeof defaultBrandKit;
    };

    expect(parsed.$schema).toBe(
      "https://rainbowcode.dev/schemas/brand-kit.json",
    );
    expect(parsed.brand).toEqual(defaultBrandKit);
    expect(result).toContain("\n  ");
  });
});