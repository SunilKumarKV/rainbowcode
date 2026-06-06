"use client";

import Link from "next/link";
import { studioNavItems } from "@/lib/navigation/studio-nav";
import { useAppShellStore } from "@/stores/app-shell-store";

export function Sidebar() {
  const isSidebarOpen = useAppShellStore((state) => state.isSidebarOpen);

  return (
    <aside
      className={`shrink-0 border-r border-slate-200 bg-white transition-all duration-200 dark:border-slate-800 dark:bg-slate-950 ${
        isSidebarOpen ? "w-72" : "w-0 overflow-hidden"
      }`}
      aria-label="Studio navigation"
    >
      <nav className="flex h-full flex-col gap-2 p-4">
        <div className="mb-3 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Workspace
          </p>
          <h2 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">
            Create visually
          </h2>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Design logos, themes, components, and export clean code.
          </p>
        </div>

        <p className="px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Studios
        </p>

        <div className="space-y-1">
          {studioNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block rounded-2xl border border-transparent px-3 py-3 text-sm transition hover:border-slate-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:hover:border-slate-800 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-700"
            >
              <span className="block font-semibold text-slate-900 group-hover:text-slate-950 dark:text-slate-100 dark:group-hover:text-white">
                {item.label}
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">
                {item.description}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
}