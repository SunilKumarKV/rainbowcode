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
            Code output is generated inside Canvas Studio
          </h3>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            Use the Canvas Studio generated-code panel for live TSX export, JSON
            export, import, copy, and future RBC CLI install flows.
          </p>

          <pre className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-left text-xs leading-6 text-slate-300">
            <code>{`rbc export canvas
rbc add component
rbc install theme`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}