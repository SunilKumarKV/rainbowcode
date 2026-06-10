import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcButton } from "@/components/ui/rbc-button";

export function CodePanel() {
  return (
    <section
      aria-label="Code output overview"
      className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 text-white shadow-[0_24px_90px_rgba(15,23,42,0.22)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-5 py-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-bold">Code Studio Preview</h2>
            <RbcBadge variant="info">Live Output</RbcBadge>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            Production-ready export surface for React, Next.js, Tailwind, JSON,
            and future RBC CLI.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <RbcButton variant="ghost" className="border border-white/10 text-white hover:bg-white/10">
            Copy
          </RbcButton>
          <RbcButton variant="primary">Export</RbcButton>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="border-b border-white/10 bg-white/[0.02] p-4 lg:border-b-0 lg:border-r">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Outputs
          </p>

          <div className="mt-4 space-y-2">
            {["React", "Tailwind", "JSON", "CLI"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 px-3 py-2 text-sm text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <pre className="max-h-80 overflow-auto p-5 text-sm leading-6 text-slate-100">
          <code>{`export const rainbowCode = {
  platform: "global-design-to-code",
  studios: {
    brand: "next",
    theme: "ready",
    component: "ready",
    canvas: "v1-ready",
    code: "preview"
  },
  outputs: ["react", "nextjs", "tailwind", "json", "rbc-cli"],
  quality: ["accessible", "typed", "exportable", "scalable"]
};`}</code>
        </pre>
      </div>
    </section>
  );
}