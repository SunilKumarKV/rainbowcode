"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcButton } from "@/components/ui/rbc-button";
import { useAppShellStore } from "@/stores/app-shell-store";

export function Topbar() {
  const toggleSidebar = useAppShellStore((state) => state.toggleSidebar);

  return (
    <header className="sticky top-3 z-40 overflow-hidden rounded-[28px] border border-white/70 bg-white/80 shadow-[0_24px_90px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/78 dark:shadow-[0_24px_90px_rgba(0,0,0,0.32)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent" />

      <div className="flex flex-wrap items-center gap-4 px-4 py-3">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle studio navigation"
          className="grid size-10 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          ☰
        </button>

        <div className="flex min-w-0 items-center gap-3">
          <div className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-2xl bg-slate-950 text-sm font-black text-white shadow-xl shadow-indigo-500/20 dark:bg-white dark:text-slate-950">
            <div className="absolute inset-0 bg-[conic-gradient(from_180deg,#ff0080,#7928ca,#2afadf,#ff0080)] opacity-80" />
            <span className="relative z-10">RBC</span>
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-base font-black tracking-tight text-slate-950 dark:text-white sm:text-lg">
                RainbowCode
              </h1>
              <RbcBadge variant="info">Design-to-Code</RbcBadge>
              <RbcBadge variant="success">Canvas V1</RbcBadge>
            </div>

            <p className="mt-1 hidden truncate text-xs text-slate-500 dark:text-slate-400 sm:block">
              Global visual builder for brands, themes, components, canvas, and
              production code.
            </p>
          </div>
        </div>

        <div className="order-last flex w-full min-w-0 flex-1 items-center gap-2 lg:order-none lg:ml-4 lg:w-auto">
          <label className="sr-only" htmlFor="studio-search">
            Search RainbowCode
          </label>

          <div className="relative min-w-0 flex-1">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              ⌘
            </span>
            <input
              id="studio-search"
              type="search"
              placeholder="Search commands, templates, tokens..."
              className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50/80 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:border-indigo-700 dark:focus:bg-slate-950"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <RbcButton variant="ghost" className="hidden sm:inline-flex">
            Docs
          </RbcButton>

          <RbcButton variant="secondary" className="hidden md:inline-flex">
            Preview
          </RbcButton>

          <RbcButton variant="primary">Export</RbcButton>
        </div>
      </div>
    </header>
  );
}