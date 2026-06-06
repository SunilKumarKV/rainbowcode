"use client";

import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { useAppShellStore } from "@/stores/app-shell-store";

export function Topbar() {
  const toggleSidebar = useAppShellStore((state) => state.toggleSidebar);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <IconButton label="Toggle studio navigation" onClick={toggleSidebar}>
        <span aria-hidden="true">☰</span>
      </IconButton>

      <div className="hidden min-w-0 md:block">
        <p className="text-sm font-bold tracking-tight text-slate-950 dark:text-white">
          RainbowCode
        </p>
        <p className="text-xs text-slate-500">Studio Shell</p>
      </div>

      <div className="min-w-0 flex-1">
        <label htmlFor="studio-search" className="sr-only">
          Search RainbowCode
        </label>
        <input
          id="studio-search"
          type="search"
          placeholder="Search projects, components, themes..."
          className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-slate-600 dark:focus:bg-slate-950 dark:focus:ring-slate-700"
        />
      </div>

      <div className="hidden items-center gap-2 sm:flex">
        <Button variant="secondary">Untitled Project</Button>
        <Button variant="ghost">Account</Button>
      </div>
    </header>
  );
}