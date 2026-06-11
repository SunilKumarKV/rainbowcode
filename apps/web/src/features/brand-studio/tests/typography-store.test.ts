import { beforeEach, describe, expect, it } from "vitest";
import {
  defaultTypographySystem,
  useTypographyStore,
} from "@/features/brand-studio/store/typography-store";

describe("useTypographyStore", () => {
  beforeEach(() => {
    useTypographyStore.getState().resetTypography();
  });

  it("starts with default typography system", () => {
    expect(useTypographyStore.getState().typography).toEqual(
      defaultTypographySystem,
    );
  });

  it("updates font families", () => {
    useTypographyStore.getState().updateHeadingFont("Poppins");
    useTypographyStore.getState().updateBodyFont("Montserrat");

    expect(useTypographyStore.getState().typography.headingFont).toBe(
      "Poppins",
    );
    expect(useTypographyStore.getState().typography.bodyFont).toBe(
      "Montserrat",
    );
  });

  it("updates typography metrics", () => {
    useTypographyStore.getState().updateHeadingWeight(700);
    useTypographyStore.getState().updateBodyWeight(400);
    useTypographyStore.getState().updateLineHeight(1.6);
    useTypographyStore.getState().updateLetterSpacing(-0.04);

    expect(useTypographyStore.getState().typography.headingWeight).toBe(700);
    expect(useTypographyStore.getState().typography.bodyWeight).toBe(400);
    expect(useTypographyStore.getState().typography.lineHeight).toBe(1.6);
    expect(useTypographyStore.getState().typography.letterSpacing).toBe(-0.04);
  });

  it("updates scale token", () => {
    useTypographyStore.getState().updateScaleToken("4xl", "3rem");

    expect(useTypographyStore.getState().typography.scale["4xl"]).toBe("3rem");
  });

  it("resets typography", () => {
    useTypographyStore.getState().updateHeadingFont("Poppins");
    useTypographyStore.getState().resetTypography();

    expect(useTypographyStore.getState().typography).toEqual(
      defaultTypographySystem,
    );
  });
});