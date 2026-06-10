"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
import { useAppShellStore } from "@/stores/app-shell-store";

export function Topbar() {
  const toggleSidebar = useAppShellStore((state) => state.toggleSidebar);

  return (
    <header className="z-40 border-b border-slate-200/80 bg-white/88 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/88">
      <div className="flex min-h-14 flex-wrap items-center gap-2 px-3 py-2 sm:gap-3 sm:py-0">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle studio navigation"
          className="grid size-9 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:focus-visible:ring-offset-slate-950"
        >
          <span aria-hidden="true">☰</span>
        </button>

        <div className="flex min-w-0 shrink-0 items-center gap-2">
          <div
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-xl bg-[conic-gradient(from_180deg,#ff0080,#7928ca,#2afadf,#ff0080)] text-[11px] font-black text-white shadow-lg shadow-indigo-500/20"
          >
            RBC
          </div>

          <div className="hidden min-w-0 sm:block">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-sm font-black tracking-tight text-slate-950 dark:text-white">
                RainbowCode
              </h1>
              <RbcBadge variant="info">Editor</RbcBadge>
            </div>
          </div>
        </div>

        <div className="hidden h-6 w-px bg-slate-200 dark:bg-slate-800 sm:block" />

        <div className="order-last flex min-w-full flex-1 items-center sm:order-none sm:min-w-0">
          <label htmlFor="studio-command-search" className="sr-only">
            Search commands, templates, and tokens
          </label>
          <input
            id="studio-command-search"
            type="search"
            placeholder="Search commands, templates, tokens..."
            className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-indigo-700 sm:max-w-2xl"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <RbcBadge variant="success">Saved</RbcBadge>

          <button
            type="button"
            className="hidden h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:focus-visible:ring-offset-slate-950 md:inline-flex md:items-center"
          >
            Preview
          </button>

          <button
            type="button"
            className="h-9 rounded-xl bg-slate-950 px-4 text-sm font-bold text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-white dark:text-slate-950 dark:focus-visible:ring-offset-slate-950"
          >
            Export
          </button>
        </div>
      </div>
    </header>
  );
}