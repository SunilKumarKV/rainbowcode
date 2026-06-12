import { beforeEach, describe, expect, it } from "vitest";
import { defaultTheme } from "@/features/theme-engine/constants/default-theme";
import { getThemePresetById } from "@/features/theme-engine/presets/theme-presets";
import { useThemeStore } from "@/features/theme-engine/store/theme-store";

describe("useThemeStore", () => {
  beforeEach(() => {
    useThemeStore.getState().resetTheme();
  });

  it("starts on the default SaaS preset", () => {
    expect(useThemeStore.getState().theme).toEqual(defaultTheme);
    expect(useThemeStore.getState().activePresetId).toBe("saas");
  });

  it("applies presets and marks them active", () => {
    useThemeStore.getState().applyPreset("neon");

    expect(useThemeStore.getState().theme).toEqual(
      getThemePresetById("neon").theme,
    );
    expect(useThemeStore.getState().activePresetId).toBe("neon");
  });

  it("switches to custom after direct token edits", () => {
    useThemeStore.getState().applyPreset("glass");
    useThemeStore.getState().updateSpacing("lg", "2rem");

    expect(useThemeStore.getState().theme.spacing.lg).toBe("2rem");
    expect(useThemeStore.getState().activePresetId).toBe("custom");
  });

  it("updates typography tokens through dedicated actions", () => {
    useThemeStore
      .getState()
      .updateTypography("fontFamily", "Sora, Inter, system-ui, sans-serif");
    useThemeStore.getState().updateTypography("fontSizeBase", "1.125rem");
    useThemeStore.getState().updateTypography("lineHeightBase", "1.7");

    expect(useThemeStore.getState().theme.typography).toEqual({
      fontFamily: "Sora, Inter, system-ui, sans-serif",
      fontSizeBase: "1.125rem",
      lineHeightBase: "1.7",
    });
  });
});
