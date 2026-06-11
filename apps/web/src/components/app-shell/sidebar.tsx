"use client";

import Link from "next/link";
import { studioNavItems } from "@/lib/navigation/studio-nav";
import { useAppShellStore } from "@/stores/app-shell-store";

const statuses: Record<string, string> = {
  "Brand Studio": "Next",
  "Theme Studio": "Ready",
  "Component Studio": "Ready",
  "Canvas Studio": "V1",
  "Code Studio": "Soon",
};

const quickAssets = [
  "Hero blocks",
  "Pricing cards",
  "SaaS buttons",
  "Brand tokens",
  "Glass themes",
] as const;

export function Sidebar() {
  const isSidebarOpen = useAppShellStore((state) => state.isSidebarOpen);

  return (
    <aside
      aria-label="Left editor sidebar"
      className={`min-h-0 border-r border-slate-200/80 bg-white/86 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/86 ${
        isSidebarOpen ? "block" : "hidden lg:block"
      }`}
    >
      <div className="grid h-full min-h-0 grid-cols-[56px_minmax(0,1fr)]">
        <nav
          aria-label="Primary editor modes"
          className="flex flex-col items-center gap-2 border-r border-slate-200/80 bg-slate-50/90 p-2 dark:border-slate-800 dark:bg-slate-900/80"
        >
          {["B", "T", "C", "V", "</>"].map((item, index) => (
            <button
              key={item}
              type="button"
              aria-label={`Editor mode ${item}`}
              className={`grid size-10 place-items-center rounded-2xl text-xs font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                index === 3
                  ? "bg-slate-950 text-white shadow-lg shadow-slate-950/15 dark:bg-white dark:text-slate-950"
                  : "text-slate-500 hover:bg-white hover:text-slate-950 dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex min-h-0 flex-col p-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
              File
            </p>
            <h2 className="mt-2 truncate text-sm font-black text-slate-950 dark:text-white">
              Untitled System
            </h2>
            <p className="mt-1 text-xs text-slate-500">Autosaved locally</p>
          </section>

          <section className="mt-3 min-h-0 flex-1 overflow-y-auto">
            <p className="px-1 text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">
              Studios
            </p>

            <div className="mt-2 space-y-1">
              {studioNavItems.map((item) => {
                const status = statuses[item.label] ?? "Soon";
                const active = item.label === "Canvas Studio";

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-2xl border px-3 py-2.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                      active
                        ? "border-indigo-200 bg-indigo-50 text-indigo-950 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200"
                        : "border-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-black">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block truncate text-xs opacity-70">
                          {item.description}
                        </span>
                      </span>

                      <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-black text-slate-600 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800">
                        {status}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-4">
              <p className="px-1 text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">
                Assets
              </p>

              <div className="mt-2 space-y-1">
                {quickAssets.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-bold text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-400 dark:hover:bg-slate-900"
                  >
                    <span className="size-2 rounded-full bg-indigo-500" />
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
}