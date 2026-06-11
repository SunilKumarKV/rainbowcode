import { beforeEach, describe, expect, it } from "vitest";
import {
  defaultBrandKit,
  useBrandStore,
} from "@/features/brand-studio/store/brand-store";

describe("useBrandStore", () => {
  beforeEach(() => {
    useBrandStore.getState().resetBrand();
  });

  it("starts with default brand kit", () => {
    expect(useBrandStore.getState().brand).toEqual(defaultBrandKit);
  });

  it("updates brand name", () => {
    useBrandStore.getState().updateBrandName("Acme Studio");

    expect(useBrandStore.getState().brand.name).toBe("Acme Studio");
  });

  it("updates brand slogan", () => {
    useBrandStore.getState().updateBrandSlogan("Create faster.");

    expect(useBrandStore.getState().brand.slogan).toBe("Create faster.");
  });

  it("updates logo text", () => {
    useBrandStore.getState().updateLogoText("AC");

    expect(useBrandStore.getState().brand.logoText).toBe("AC");
  });

  it("updates palette color", () => {
    useBrandStore.getState().updatePaletteColor("primary", "#111111");

    expect(useBrandStore.getState().brand.palette[0]?.value).toBe("#111111");
  });

  it("resets brand", () => {
    useBrandStore.getState().updateBrandName("Changed");
    useBrandStore.getState().resetBrand();

    expect(useBrandStore.getState().brand).toEqual(defaultBrandKit);
  });
});