import { describe, expect, it } from "vitest";
import { generateCardCode } from "@/features/component-studio/generators/card-generator";
import { defaultCardDefinition } from "@/features/component-studio/registry/card-definition";
import type { CardDefinition } from "@/features/component-studio/types/component-definition";

describe("generateCardCode", () => {
  it("generates a simple card", () => {
    const output = generateCardCode(defaultCardDefinition);

    expect(output).toContain("<article");
    expect(output).toContain("Build faster with RainbowCode");
    expect(output).toContain("rounded-[var(--radius-xl)]");
  });

  it("generates a feature card using primary token border", () => {
    const definition: CardDefinition = {
      ...defaultCardDefinition,
      variant: "feature",
    };

    const output = generateCardCode(definition);

    expect(output).toContain("border-[var(--color-primary)]");
  });

  it("generates a pricing card using secondary token border", () => {
    const definition: CardDefinition = {
      ...defaultCardDefinition,
      variant: "pricing",
    };

    const output = generateCardCode(definition);

    expect(output).toContain("border-[var(--color-secondary)]");
  });

  it("omits action when showAction is false", () => {
    const definition: CardDefinition = {
      ...defaultCardDefinition,
      showAction: false,
    };

    const output = generateCardCode(definition);

    expect(output).not.toContain("<button");
    expect(output).not.toContain("Start Building");
  });

  it("escapes unsafe text", () => {
    const definition: CardDefinition = {
      ...defaultCardDefinition,
      title: "<Card & Title>",
      description: "<Description & Copy>",
      actionLabel: "<Action & Go>",
    };

    const output = generateCardCode(definition);

    expect(output).toContain("&lt;Card &amp; Title&gt;");
    expect(output).toContain("&lt;Description &amp; Copy&gt;");
    expect(output).toContain("&lt;Action &amp; Go&gt;");
  });
});