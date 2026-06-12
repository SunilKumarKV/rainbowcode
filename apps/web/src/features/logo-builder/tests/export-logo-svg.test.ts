import { describe, expect, it } from "vitest";
import { exportLogoSvg } from "@/features/logo-builder/exporters/export-logo-svg";
import { defaultLogoConfig } from "@/features/logo-builder/store/logo-store";

describe("exportLogoSvg", () => {
  it("exports a valid svg string", () => {
    const svg = exportLogoSvg(defaultLogoConfig);

    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
    expect(svg).toContain("RainbowCode");
    expect(svg).toContain("linearGradient");
  });

  it("escapes unsafe text", () => {
    const svg = exportLogoSvg({
      ...defaultLogoConfig,
      text: "<script>",
      tagline: "A & B",
    });

    expect(svg).toContain("&lt;script&gt;");
    expect(svg).toContain("A &amp; B");
    expect(svg).not.toContain("<script>");
  });
});