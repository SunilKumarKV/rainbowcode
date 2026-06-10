import { RbcBadge } from "@/components/ui/rbc-badge";

export function CodePanel() {
  return (
    <section
      aria-label="Code output overview"
      className="overflow-hidden rounded-3xl border border-white/70 bg-slate-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)] dark:border-white/10"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-semibold">Code Studio Preview</h2>
            <RbcBadge variant="info">Live</RbcBadge>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            Production-ready React, Tailwind, JSON, and export flows.
          </p>
        </div>

        <div className="text-xs text-slate-400">RBC Export Engine</div>
      </div>

      <pre className="overflow-auto p-5 text-sm leading-6 text-slate-100">
        <code>{`export const rainbowCode = {
  studios: ["brand", "theme", "component", "canvas", "code"],
  output: ["react", "nextjs", "tailwind", "json"],
  status: "design-system-polish"
};`}</code>
      </pre>
    </section>
  );
}