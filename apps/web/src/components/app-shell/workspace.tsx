import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcCard } from "@/components/ui/rbc-card";

export function Workspace() {
  return (
    <RbcCard className="overflow-hidden p-0">
      <section
        aria-label="RainbowCode workspace overview"
        className="relative overflow-hidden p-6 sm:p-8"
      >
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-40 w-40 rounded-full bg-fuchsia-400/10 blur-3xl" />

        <div className="relative z-10 flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-2">
              <RbcBadge variant="success">Canvas V1 Ready</RbcBadge>
              <RbcBadge variant="info">Design System Phase</RbcBadge>
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Build design systems visually, then ship real code.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              RainbowCode combines Brand Studio, Theme Studio, Component Studio,
              Canvas Studio, and Code Studio into one production-grade workflow.
            </p>
          </div>

          <div className="grid min-w-52 gap-3 rounded-3xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
            <div>
              <p className="text-xs text-slate-500">Current focus</p>
              <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">
                UI/UX Polish
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Next major studio</p>
              <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">
                Brand Studio
              </p>
            </div>
          </div>
        </div>
      </section>
    </RbcCard>
  );
}