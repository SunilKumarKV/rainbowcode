import { describe, expect, it } from "vitest";
import {
  rbcBadge,
  rbcButton,
  rbcFocusRing,
  rbcSurface,
  rbcText,
} from "@/lib/design-system/ui-tokens";

describe("RainbowCode UI tokens", () => {
  it("exposes shared focus ring classes", () => {
    expect(rbcFocusRing).toContain("focus-visible:ring-2");
  });

  it("exposes shared surface classes", () => {
    expect(rbcSurface.app).toContain("bg-[radial-gradient");
    expect(rbcSurface.card).toContain("backdrop-blur");
    expect(rbcSurface.panel).toContain("border");
  });

  it("exposes shared text classes", () => {
    expect(rbcText.eyebrow).toContain("uppercase");
    expect(rbcText.title).toContain("font-semibold");
  });

  it("exposes button variants", () => {
    expect(rbcButton.primary).toContain("bg-slate-950");
    expect(rbcButton.secondary).toContain("border");
  });

  it("exposes badge variants", () => {
    expect(rbcBadge.success).toContain("emerald");
    expect(rbcBadge.info).toContain("indigo");
  });
});