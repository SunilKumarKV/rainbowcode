import { describe, expect, it } from "vitest";
import { defaultButtonDefinition } from "@/features/component-studio/registry/button-definition";
import { generateButtonCode } from "@/features/component-studio/generators/button-generator";
import type { ButtonDefinition } from "@/features/component-studio/types/component-definition";

describe("generateButtonCode", () => {
  it("generates a primary button using theme tokens", () => {
    const output = generateButtonCode(defaultButtonDefinition);

    expect(output).toContain("Get Started");
    expect(output).toContain("bg-[var(--color-primary)]");
    expect(output).toContain("rounded-[var(--radius-md)]");
  });

  it("generates a secondary button using theme tokens", () => {
    const definition: ButtonDefinition = {
      ...defaultButtonDefinition,
      variant: "secondary",
    };

    const output = generateButtonCode(definition);

    expect(output).toContain("bg-[var(--color-secondary)]");
    expect(output).toContain("focus-visible:ring-[var(--color-secondary)]");
  });

  it("generates an outline button using theme tokens", () => {
    const definition: ButtonDefinition = {
      ...defaultButtonDefinition,
      variant: "outline",
    };

    const output = generateButtonCode(definition);

    expect(output).toContain("border-[var(--color-primary)]");
    expect(output).toContain("text-[var(--color-primary)]");
  });

  it("escapes unsafe label characters", () => {
    const definition: ButtonDefinition = {
      ...defaultButtonDefinition,
      label: "<Start & Build>",
    };

    const output = generateButtonCode(definition);

    expect(output).toContain("&lt;Start &amp; Build&gt;");
  });
});