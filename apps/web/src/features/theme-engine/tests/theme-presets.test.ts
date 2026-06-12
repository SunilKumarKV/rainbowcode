import { describe, expect, it } from "vitest";
import { getThemeCssVariables } from "@/features/theme-engine/runtime/apply-theme";
import {
  getThemePresetById,
  themePresets,
  type ThemePresetId,
} from "@/features/theme-engine/presets/theme-presets";
import { themeSchema } from "@/features/theme-engine/validation/theme-schema";

describe("theme presets", () => {
  it("defines the full preset set", () => {
    expect(themePresets.map((preset) => preset.id)).toEqual<ThemePresetId[]>([
      "glass",
      "saas",
      "neon",
      "minimal",
      "gaming",
      "luxury",
    ]);
  });

  it("keeps every preset schema-valid and runtime-compatible", () => {
    for (const preset of themePresets) {
      expect(themeSchema.parse(preset.theme)).toEqual(preset.theme);
      expect(getThemeCssVariables(preset.theme)).toContainEqual([
        "--color-primary",
        preset.theme.colors.primary,
      ]);
      expect(getThemeCssVariables(preset.theme)).toContainEqual([
        "--font-family-base",
        preset.theme.typography.fontFamily,
      ]);
    }
  });

  it("returns presets by id", () => {
    expect(getThemePresetById("luxury").label).toBe("Luxury");
    expect(getThemePresetById("saas").theme.colors.primary).toBe("#2563eb");
  });
});
