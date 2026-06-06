import { describe, expect, it } from "vitest";
import { generateInputCode } from "@/features/component-studio/generators/input-generator";
import { defaultInputDefinition } from "@/features/component-studio/registry/input-definition";
import type { InputDefinition } from "@/features/component-studio/types/component-definition";

describe("generateInputCode", () => {
  it("generates a default input using theme radius", () => {
    const output = generateInputCode(defaultInputDefinition);

    expect(output).toContain("<input");
    expect(output).toContain("Email address");
    expect(output).toContain('placeholder="you@example.com"');
    expect(output).toContain("rounded-[var(--radius-md)]");
  });

  it("generates filled input variant", () => {
    const definition: InputDefinition = {
      ...defaultInputDefinition,
      variant: "filled",
    };

    const output = generateInputCode(definition);

    expect(output).toContain("bg-slate-100");
  });

  it("generates outline input variant using primary token", () => {
    const definition: InputDefinition = {
      ...defaultInputDefinition,
      variant: "outline",
    };

    const output = generateInputCode(definition);

    expect(output).toContain("border-[var(--color-primary)]");
  });

  it("supports disabled input", () => {
    const definition: InputDefinition = {
      ...defaultInputDefinition,
      disabled: true,
    };

    const output = generateInputCode(definition);

    expect(output).toContain("disabled");
    expect(output).toContain("disabled:opacity-60");
  });

  it("escapes unsafe text", () => {
    const definition: InputDefinition = {
      ...defaultInputDefinition,
      label: '<Email & "Name">',
      placeholder: '<type & "here">',
      helperText: '<helper & "copy">',
    };

    const output = generateInputCode(definition);

    expect(output).toContain("&lt;Email &amp; &quot;Name&quot;&gt;");
    expect(output).toContain("&lt;type &amp; &quot;here&quot;&gt;");
    expect(output).toContain("&lt;helper &amp; &quot;copy&quot;&gt;");
  });
});