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

      <div className="grid h-[calc(100%-44px)] place-items-center p-4">
        <div className="max-w-md text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-lg">
            {"</>"}
          </div>

          <h3 className="mt-4 text-sm font-bold text-white">
            Code output lives inside Canvas Studio
          </h3>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            Use generated-code controls from the canvas panel for TSX, JSON,
            copy, import, and export flows.
          </p>
        </div>
      </div>
    </section>
  );
}