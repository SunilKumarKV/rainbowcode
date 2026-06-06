"use client";

import { IconButton } from "@/components/ui/icon-button";
import { Button } from "@/components/ui/button";
import { useAppShellStore } from "@/stores/app-shell-store";

export function Topbar() {
  const toggleSidebar = useAppShellStore((state) => state.toggleSidebar);

  return (
    <header className="flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-950">
      <IconButton label="Toggle studio navigation" onClick={toggleSidebar}>
        ☰
      </IconButton>

      <div className="min-w-0 flex-1">
        <label htmlFor="studio-search" className="sr-only">
          Search RainbowCode
        </label>
        <input
          id="studio-search"
          type="search"
          placeholder="Search projects, components, themes..."
          className="h-10 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-950 outline-none focus:ring-2 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>

      <Button variant="secondary">Project: Untitled</Button>
      <Button variant="ghost">User</Button>
    </header>
  );
}