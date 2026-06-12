import type { LogoConfig } from "@/features/logo-builder/types/logo";

function escapeSvgText(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function getGradientCoordinates(direction: LogoConfig["gradientDirection"]): {
  readonly x1: string;
  readonly y1: string;
  readonly x2: string;
  readonly y2: string;
} {
  if (direction === "to-right") {
    return { x1: "0%", y1: "50%", x2: "100%", y2: "50%" };
  }

  if (direction === "to-bottom") {
    return { x1: "50%", y1: "0%", x2: "50%", y2: "100%" };
  }

  if (direction === "to-top-right") {
    return { x1: "0%", y1: "100%", x2: "100%", y2: "0%" };
  }

  return { x1: "0%", y1: "0%", x2: "100%", y2: "100%" };
}

export function exportLogoSvg(logo: LogoConfig): string {
  const gradient = getGradientCoordinates(logo.gradientDirection);
  const safeText = escapeSvgText(logo.text.trim() || "Logo");
  const safeTagline = escapeSvgText(logo.tagline.trim());

  return `<svg width="960" height="540" viewBox="0 0 960 540" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="960" height="540" rx="${logo.radius}" fill="${logo.backgroundColor}"/>
  <defs>
    <linearGradient id="logoGradient" x1="${gradient.x1}" y1="${gradient.y1}" x2="${gradient.x2}" y2="${gradient.y2}">
      <stop offset="0%" stop-color="${logo.primaryColor}"/>
      <stop offset="100%" stop-color="${logo.secondaryColor}"/>
    </linearGradient>
  </defs>
  <circle cx="180" cy="270" r="92" fill="url(#logoGradient)"/>
  <text x="180" y="292" text-anchor="middle" font-family="${logo.fontFamily}, Arial, sans-serif" font-size="54" font-weight="${logo.fontWeight}" fill="white">${safeText.slice(0, 3).toUpperCase()}</text>
  <text x="320" y="250" font-family="${logo.fontFamily}, Arial, sans-serif" font-size="64" font-weight="${logo.fontWeight}" letter-spacing="${logo.letterSpacing}" fill="url(#logoGradient)">${safeText}</text>
  <text x="324" y="310" font-family="${logo.fontFamily}, Arial, sans-serif" font-size="24" font-weight="500" fill="rgba(255,255,255,0.72)">${safeTagline}</text>
</svg>`;
}