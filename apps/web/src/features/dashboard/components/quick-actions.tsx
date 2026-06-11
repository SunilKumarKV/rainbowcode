import { quickActions } from "@/features/dashboard/data/studio-home-data";

export function QuickActions() {
  return (
    <section
      aria-label="Quick actions"
      className="rounded-[32px] border border-white/70 bg-slate-950 p-5 text-white shadow-[0_30px_100px_rgba(15,23,42,0.22)] dark:border-white/10"
    >
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-300">
            Command Center
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight">
            Start faster with one action.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Create a brand kit, open the canvas, import work, or export
            production-ready code.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, index) => (
            <button
              key={action}
              type="button"
              className={`rounded-2xl px-4 py-3 text-left text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                index === 0
                  ? "bg-white text-slate-950 hover:bg-slate-200"
                  : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}