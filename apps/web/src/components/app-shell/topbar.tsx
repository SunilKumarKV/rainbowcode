import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcButton } from "@/components/ui/rbc-button";

export function Topbar() {
  return (
    <header className="sticky top-3 z-30 rounded-3xl border border-white/70 bg-white/82 px-4 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/82">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-cyan-400 text-sm font-black text-white shadow-lg shadow-indigo-500/20">
            RBC
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-base font-bold tracking-tight text-slate-950 dark:text-white">
                RainbowCode Studio
              </h1>
              <RbcBadge variant="info">Founder Build</RbcBadge>
            </div>

            <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
              Design visually. Generate production-ready code.
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          <label className="sr-only" htmlFor="studio-search">
            Search RainbowCode
          </label>
          <input
            id="studio-search"
            type="search"
            placeholder="Search studio, tokens, components..."
            className="hidden h-10 min-w-0 max-w-sm flex-1 rounded-2xl border border-slate-200 bg-white/80 px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-200 dark:focus:ring-slate-700 md:block"
          />

          <RbcButton variant="ghost">Docs</RbcButton>
          <RbcButton variant="primary">Export</RbcButton>
        </div>
      </div>
    </header>
  );
}