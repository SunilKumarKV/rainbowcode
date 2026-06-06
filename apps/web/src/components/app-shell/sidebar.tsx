"use client";

import Link from "next/link";
import { studioNavItems } from "@/lib/navigation/studio-nav";
import { useAppShellStore } from "@/stores/app-shell-store";

export function Sidebar() {
  const isSidebarOpen = useAppShellStore((state) => state.isSidebarOpen);

  return (
    <aside
      className={`border-r border-slate-200 bg-slate-50 transition-all dark:border-slate-800 dark:bg-slate-950 ${
        isSidebarOpen ? "w-72" : "w-0 overflow-hidden"
      }`}
      aria-label="Studio navigation"
    >
      <nav className="flex h-full flex-col gap-2 p-4">
        <p className="px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Studios
        </p>

        {studioNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl px-3 py-3 text-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 dark:hover:bg-slate-900"
          >
            <span className="block font-semibold text-slate-950 dark:text-white">
              {item.label}
            </span>
            <span className="mt-1 block text-xs leading-5 text-slate-500">
              {item.description}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}