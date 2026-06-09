import type { CanvasNode } from "@/features/canvas-studio/types/canvas-node";

function escapeText(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function generateRectangleNodeCode(node: CanvasNode): string {
  if (node.type !== "rectangle") {
    throw new Error("Expected rectangle node.");
  }

  return `<div
  className="absolute rounded-[${node.radius}px]"
  style={{
    left: "${Math.round(node.x)}px",
    top: "${Math.round(node.y)}px",
    width: "${Math.round(node.width)}px",
    height: "${Math.round(node.height)}px",
    background: "${node.fill}",
  }}
/>`;
}

function generateTextNodeCode(node: CanvasNode): string {
  if (node.type !== "text") {
    throw new Error("Expected text node.");
  }

  return `<p
  className="absolute font-semibold"
  style={{
    left: "${Math.round(node.x)}px",
    top: "${Math.round(node.y)}px",
    width: "${Math.round(node.width)}px",
    minHeight: "${Math.round(node.height)}px",
    fontSize: "${node.fontSize}px",
    color: "${node.fill}",
  }}
>
  ${escapeText(node.text)}
</p>`;
}

function generateGroupNodeCode(node: CanvasNode): string {
  if (node.type !== "group") {
    throw new Error("Expected group node.");
  }

  return `<div
  className="absolute rounded-xl border border-dashed border-slate-400"
  data-rbc-group="${node.id}"
  data-rbc-children="${node.childNodeIds.join(",")}"
  style={{
    left: "${Math.round(node.x)}px",
    top: "${Math.round(node.y)}px",
    width: "${Math.round(node.width)}px",
    height: "${Math.round(node.height)}px",
  }}
/>`;
}

export function generateCanvasCode(nodes: readonly CanvasNode[]): string {
  const nodeCode = nodes
    .map((node) => {
      if (node.type === "rectangle") {
        return generateRectangleNodeCode(node);
      }

      if (node.type === "text") {
        return generateTextNodeCode(node);
      }

      return generateGroupNodeCode(node);
    })
    .join("\n\n");

  return `<section className="relative min-h-[520px] w-full overflow-hidden rounded-3xl bg-white">
${nodeCode}
</section>`;
}