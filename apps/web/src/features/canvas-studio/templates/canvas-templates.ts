import type { CanvasNode } from "@/features/canvas-studio/types/canvas-node";

export type CanvasTemplateId = "hero" | "pricing-card";

export type CanvasTemplate = {
  readonly id: CanvasTemplateId;
  readonly name: string;
  readonly description: string;
  readonly nodes: readonly CanvasNode[];
};

export const canvasTemplates: readonly CanvasTemplate[] = [
  {
    id: "hero",
    name: "Hero Section",
    description: "Landing page hero layout with background block and headline.",
    nodes: [
      {
        id: "template-hero-bg",
        type: "rectangle",
        x: 80,
        y: 80,
        width: 620,
        height: 260,
        fill: "var(--color-primary)",
        radius: 28,
      },
      {
        id: "template-hero-title",
        type: "text",
        x: 130,
        y: 135,
        width: 440,
        height: 64,
        text: "Build beautiful interfaces faster",
        fontSize: 32,
        fill: "var(--color-background)",
      },
      {
        id: "template-hero-subtitle",
        type: "text",
        x: 132,
        y: 215,
        width: 420,
        height: 48,
        text: "Design visually. Export production-ready code.",
        fontSize: 20,
        fill: "var(--color-background)",
      },
    ],
  },
  {
    id: "pricing-card",
    name: "Pricing Card",
    description: "Simple SaaS pricing card layout.",
    nodes: [
      {
        id: "template-pricing-card",
        type: "rectangle",
        x: 120,
        y: 90,
        width: 320,
        height: 360,
        fill: "var(--color-background)",
        radius: 24,
      },
      {
        id: "template-pricing-title",
        type: "text",
        x: 150,
        y: 130,
        width: 240,
        height: 40,
        text: "Pro Plan",
        fontSize: 28,
        fill: "var(--color-foreground)",
      },
      {
        id: "template-pricing-price",
        type: "text",
        x: 150,
        y: 190,
        width: 220,
        height: 52,
        text: "$19/mo",
        fontSize: 36,
        fill: "var(--color-primary)",
      },
      {
        id: "template-pricing-button",
        type: "rectangle",
        x: 150,
        y: 335,
        width: 220,
        height: 56,
        fill: "var(--color-primary)",
        radius: 16,
      },
      {
        id: "template-pricing-button-text",
        type: "text",
        x: 195,
        y: 350,
        width: 140,
        height: 28,
        text: "Get Started",
        fontSize: 18,
        fill: "var(--color-background)",
      },
    ],
  },
];

export function getCanvasTemplate(
  templateId: CanvasTemplateId,
): CanvasTemplate {
  const template = canvasTemplates.find((item) => item.id === templateId);

  if (template === undefined) {
    throw new Error(`Canvas template not found: ${templateId}`);
  }

  return template;
}