import { beforeEach, describe, expect, it } from "vitest";
import {
  defaultLogoConfig,
  useLogoStore,
} from "@/features/logo-builder/store/logo-store";

describe("useLogoStore", () => {
  beforeEach(() => {
    useLogoStore.getState().resetLogo();
  });

  it("starts with default logo config", () => {
    expect(useLogoStore.getState().logo).toEqual(defaultLogoConfig);
  });

  it("updates text", () => {
    useLogoStore.getState().updateText("Acme");

    expect(useLogoStore.getState().logo.text).toBe("Acme");
  });

  it("updates typography settings", () => {
    useLogoStore.getState().updateFontFamily("Poppins");
    useLogoStore.getState().updateFontWeight(700);
    useLogoStore.getState().updateLetterSpacing(2);

    expect(useLogoStore.getState().logo.fontFamily).toBe("Poppins");
    expect(useLogoStore.getState().logo.fontWeight).toBe(700);
    expect(useLogoStore.getState().logo.letterSpacing).toBe(2);
  });

  it("updates colors", () => {
    useLogoStore.getState().updatePrimaryColor("#111111");
    useLogoStore.getState().updateSecondaryColor("#222222");
    useLogoStore.getState().updateBackgroundColor("#333333");

    expect(useLogoStore.getState().logo.primaryColor).toBe("#111111");
    expect(useLogoStore.getState().logo.secondaryColor).toBe("#222222");
    expect(useLogoStore.getState().logo.backgroundColor).toBe("#333333");
  });

  it("resets logo", () => {
    useLogoStore.getState().updateText("Changed");
    useLogoStore.getState().resetLogo();

    expect(useLogoStore.getState().logo).toEqual(defaultLogoConfig);
  });
});