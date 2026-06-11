"use client";

import { useAppShellStore } from "@/stores/app-shell-store";

const toolItems = ["Move", "Frame", "Shape", "Text", "Hand", "Comment"] as const;

export function Topbar() {
  const toggleSidebar = useAppShellStore((state) => state.toggleSidebar);

  return (
    <header className="z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/90">
      <div className="grid min-h-14 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-3">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            className="grid size-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            <span aria-hidden="true">☰</span>
          </button>

          <div className="grid size-9 place-items-center rounded-xl bg-[conic-gradient(from_180deg,#4f46e5,#db2777,#06b6d4,#4f46e5)] text-[11px] font-black text-white shadow-lg shadow-indigo-500/20">
            RBC
          </div>

          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-black tracking-tight text-slate-950 dark:text-white">
              RainbowCode
            </p>
            <p className="-mt-0.5 truncate text-[11px] font-medium text-slate-500">
              Untitled Design System
            </p>
          </div>
        </div>

        <div className="mx-auto hidden items-center gap-1 rounded-2xl border border-slate-200 bg-slate-100/80 p-1 dark:border-slate-800 dark:bg-slate-900/80 lg:flex">
          {toolItems.map((item, index) => (
            <button
              key={item}
              type="button"
              className={`h-9 rounded-xl px-3 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                index === 0
                  ? "bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white"
                  : "text-slate-600 hover:bg-white/70 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex min-w-0 items-center justify-end gap-2">
          <label htmlFor="studio-command-search" className="sr-only">
            Search commands
          </label>
          <input
            id="studio-command-search"
            type="search"
            placeholder="⌘K Search"
            className="hidden h-9 w-52 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 md:block"
          />

          <button
            type="button"
            className="hidden h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 md:inline-flex md:items-center"
          >
            Share
          </button>

          <button
            type="button"
            className="h-9 rounded-xl bg-slate-950 px-4 text-xs font-black text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:bg-white dark:text-slate-950"
          >
            Export
          </button>
        </div>
      </div>
    </header>
  );
}