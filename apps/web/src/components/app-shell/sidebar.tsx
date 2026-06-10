"use client";

import Link from "next/link";
import { RbcBadge } from "@/components/ui/rbc-badge";
import { studioNavItems } from "@/lib/navigation/studio-nav";
import { useAppShellStore } from "@/stores/app-shell-store";

const statuses: Record<string, "Next" | "Ready" | "V1" | "Soon"> = {
  "Brand Studio": "Next",
  "Theme Studio": "Ready",
  "Component Studio": "Ready",
  "Canvas Studio": "V1",
  "Code Studio": "Soon",
};

function getStatusVariant(status: "Next" | "Ready" | "V1" | "Soon") {
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
      className={`min-h-0 border-r border-slate-200/80 bg-white/82 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/82 ${
        isSidebarOpen ? "block" : "hidden lg:block"
      }`}
    >
      <div className="flex h-full min-h-0 flex-col p-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
            Current Project
          </p>
          <h2 className="mt-2 truncate text-sm font-black text-slate-950 dark:text-white">
            Untitled Design System
          </h2>
          <p className="mt-1 text-xs text-slate-500">Local draft</p>
        </div>

        <nav className="mt-3 flex-1 space-y-1 overflow-y-auto" aria-label="Studios">
          {studioNavItems.map((item) => {
            const status = statuses[item.label] ?? "Soon";

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group block rounded-2xl px-3 py-2.5 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-slate-900"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-slate-800 group-hover:text-slate-950 dark:text-slate-200 dark:group-hover:text-white">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-slate-500">
                      {item.description}
                    </span>
                  </span>

                  <RbcBadge variant={getStatusVariant(status)}>{status}</RbcBadge>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-xs font-bold text-slate-950 dark:text-white">
            Founder standard
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Build editor quality first. Brand Studio starts after UI system is
            production-grade.
          </p>
        </div>
      </div>
    </aside>
  );
}