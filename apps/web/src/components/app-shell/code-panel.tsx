import { RbcBadge } from "@/components/ui/rbc-badge";

export function CodePanel() {
  return (
    <section
      aria-label="Code output overview"
      className="h-full overflow-hidden bg-slate-950 text-white"
    >
      <div className="flex h-11 items-center justify-between border-b border-white/10 px-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            Code Preview
          </h2>
          <RbcBadge variant="info">Live</RbcBadge>
        </div>

        <span className="text-xs text-slate-500">React / Tailwind / JSON</span>
      </div>

      <pre className="h-[calc(100%-44px)] overflow-auto p-4 text-xs leading-6 text-slate-100">
        <code>{`export const rainbowCode = {
  product: "global-design-to-code-editor",
  studios: ["brand", "theme", "component", "canvas", "code"],
  canvas: "v1-ready",
  next: "brand-studio"
};`}</code>
      </pre>
    </section>
  );
}