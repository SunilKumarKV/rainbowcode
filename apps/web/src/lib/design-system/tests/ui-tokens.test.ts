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
    expect(rbcSurface.app).toContain("text-[var(--surface-foreground)]");
    expect(rbcSurface.card).toContain("rbc-surface-card");
    expect(rbcSurface.panel).toContain("rbc-surface-panel");
  });

  it("exposes shared text classes", () => {
    expect(rbcText.eyebrow).toContain("uppercase");
    expect(rbcText.title).toContain("font-black");
  });

  it("exposes button variants", () => {
    expect(rbcButton.primary).toContain("bg-[var(--color-primary)]");
    expect(rbcButton.primary).toContain("text-[var(--surface-on-primary)]");
    expect(rbcButton.secondary).toContain("border");
  });

  it("exposes badge variants", () => {
    expect(rbcBadge.success).toContain("var(--surface-success-soft)");
    expect(rbcBadge.info).toContain("var(--surface-accent-soft)");
  });
});
