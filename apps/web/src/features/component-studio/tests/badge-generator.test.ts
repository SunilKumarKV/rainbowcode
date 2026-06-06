import { describe, expect, it } from "vitest";
import { generateBadgeCode } from "@/features/component-studio/generators/badge-generator";
import { defaultBadgeDefinition } from "@/features/component-studio/registry/badge-definition";
import type { BadgeDefinition } from "@/features/component-studio/types/component-definition";

describe("generateBadgeCode", () => {
  it("generates a primary badge using theme tokens", () => {
    const output = generateBadgeCode(defaultBadgeDefinition);

    expect(output).toContain("<span");
    expect(output).toContain("New");
    expect(output).toContain("bg-[var(--color-primary)]");
    expect(output).toContain("rounded-[var(--radius-xl)]");
  });

  it("generates success badge", () => {
    const definition: BadgeDefinition = {
      ...defaultBadgeDefinition,
      variant: "success",
    };

    const output = generateBadgeCode(definition);

    expect(output).toContain("bg-[var(--color-success)]");
  });

  it("generates warning badge", () => {
    const definition: BadgeDefinition = {
      ...defaultBadgeDefinition,
      variant: "warning",
    };

    const output = generateBadgeCode(definition);

    expect(output).toContain("bg-[var(--color-warning)]");
  });

  it("generates outline badge", () => {
    const definition: BadgeDefinition = {
      ...defaultBadgeDefinition,
      variant: "outline",
    };

    const output = generateBadgeCode(definition);

    expect(output).toContain("border-[var(--color-primary)]");
    expect(output).toContain("text-[var(--color-primary)]");
  });

  it("escapes unsafe label", () => {
    const definition: BadgeDefinition = {
      ...defaultBadgeDefinition,
      label: "<New & Beta>",
    };

    const output = generateBadgeCode(definition);

    expect(output).toContain("&lt;New &amp; Beta&gt;");
  });
});