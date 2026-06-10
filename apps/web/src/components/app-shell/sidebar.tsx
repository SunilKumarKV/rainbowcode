import { RbcBadge } from "@/components/ui/rbc-badge";

const studioSections = [
  {
    label: "Brand Studio",
    status: "Next",
  },
  {
    label: "Theme Studio",
    status: "Ready",
  },
  {
    label: "Component Studio",
    status: "Ready",
  },
  {
    label: "Canvas Studio",
    status: "V1",
  },
  {
    label: "Code Studio",
    status: "Soon",
  },
] as const;

const platformLinks = ["Docs", "Templates", "Marketplace", "Community"] as const;

export function Sidebar() {
  return (
    <aside
      aria-label="RainbowCode navigation"
      className="rounded-3xl border border-white/70 bg-white/78 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/76"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
          Studios
        </p>

        <nav className="mt-4 space-y-2" aria-label="Studio sections">
          {studioSections.map((item) => (
            <button
              key={item.label}
              type="button"
              className="group flex w-full items-center justify-between rounded-2xl border border-transparent px-3 py-3 text-left transition hover:border-slate-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:hover:border-slate-800 dark:hover:bg-slate-900"
            >
              <span>
                <span className="block text-sm font-semibold text-slate-800 group-hover:text-slate-950 dark:text-slate-200 dark:group-hover:text-white">
                  {item.label}
                </span>
                <span className="mt-1 block text-xs text-slate-500">
                  Build and customize
                </span>
              </span>

              <RbcBadge
                variant={
                  item.status === "Ready" || item.status === "V1"
                    ? "success"
                    : item.status === "Next"
                      ? "info"
                      : "neutral"
                }
              >
                {item.status}
              </RbcBadge>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/50">
        <p className="text-sm font-semibold text-slate-950 dark:text-white">
          Build status
        </p>
        <p className="mt-2 text-xs leading-5 text-slate-500">
          Canvas V1 is ready. Design system polish is now active before Brand
          Studio.
        </p>
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Platform
        </p>

        <div className="mt-3 space-y-1">
          {platformLinks.map((item) => (
            <button
              key={item}
              type="button"
              className="block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}