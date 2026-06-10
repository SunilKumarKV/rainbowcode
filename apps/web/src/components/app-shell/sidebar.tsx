"use client";

import Link from "next/link";
import { RbcBadge } from "@/components/ui/rbc-badge";
import { studioNavItems } from "@/lib/navigation/studio-nav";
import { useAppShellStore } from "@/stores/app-shell-store";

const statuses: Record<string, "Ready" | "V1" | "Next" | "Soon"> = {
  "Brand Studio": "Next",
  "Theme Studio": "Ready",
  "Component Studio": "Ready",
  "Canvas Studio": "V1",
  "Code Studio": "Soon",
};

function getBadgeVariant(status: "Ready" | "V1" | "Next" | "Soon") {
  if (status === "Ready" || status === "V1") {
    return "success";
  }

  if (status === "Next") {
    return "info";
  }

  return "neutral";
}

export function Sidebar() {
  const isSidebarOpen = useAppShellStore((state) => state.isSidebarOpen);

  return (
    <aside
      aria-label="Studio navigation"
      className={`min-h-0 rounded-[28px] border border-white/70 bg-white/72 shadow-[0_24px_90px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all dark:border-white/10 dark:bg-slate-950/72 ${
        isSidebarOpen
          ? "w-full p-4 lg:w-auto"
          : "hidden overflow-hidden p-0 lg:block lg:w-0"
      }`}
    >
      <div className="flex h-full min-h-0 flex-col">
        <div className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
            Project
          </p>

          <h2 className="mt-2 text-lg font-black tracking-tight text-slate-950 dark:text-white">
            Untitled Design System
          </h2>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            Build once. Export everywhere.
          </p>
        </div>

        <nav className="mt-4 flex-1 space-y-2 overflow-y-auto pr-1">
          {studioNavItems.map((item) => {
            const status = statuses[item.label] ?? "Soon";

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group block rounded-3xl border border-transparent p-3 transition hover:border-indigo-200/80 hover:bg-white/90 hover:shadow-lg hover:shadow-indigo-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:hover:border-indigo-900/80 dark:hover:bg-slate-900/90"
              >
                <div className="flex items-start justify-between gap-3">
                  <span>
                    <span className="block text-sm font-bold text-slate-800 group-hover:text-slate-950 dark:text-slate-200 dark:group-hover:text-white">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      {item.description}
                    </span>
                  </span>

                  <RbcBadge variant={getBadgeVariant(status)}>
                    {status}
                  </RbcBadge>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 rounded-3xl border border-dashed border-indigo-200 bg-indigo-50/70 p-4 dark:border-indigo-900 dark:bg-indigo-950/30">
          <p className="text-sm font-bold text-slate-950 dark:text-white">
            Founder roadmap
          </p>
          <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
            UI/UX polish → Brand Studio → Code Studio → Marketplace → Launch.
          </p>
        </div>
      </div>
    </aside>
  );
}