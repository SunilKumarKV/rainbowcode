"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { studioNavItems } from "@/lib/navigation/studio-nav";
import { useAppShellStore } from "@/stores/app-shell-store";

export function Topbar() {
  const pathname = usePathname();
  const toggleSidebar = useAppShellStore((state) => state.toggleSidebar);
  const openCommandPalette = useAppShellStore(
    (state) => state.openCommandPalette,
  );

  const activeStudio =
    studioNavItems.find((item) => item.href === pathname) ?? studioNavItems[0];

  return (
    <header className="z-50 border-b border-[var(--theme-border-soft)] bg-[var(--surface-panel)] backdrop-blur-2xl">
      <div className="grid min-h-14 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-3">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            className="grid size-9 place-items-center rounded-xl border border-[var(--theme-border-soft)] bg-[var(--surface-panel-strong)] text-[var(--surface-foreground)] hover:bg-[var(--surface-card-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-focus-ring)]"
          >
            <span aria-hidden="true">☰</span>
          </button>

          <div className="grid size-9 place-items-center rounded-xl text-[11px] font-black text-[var(--surface-on-primary)] shadow-[var(--shadow-soft)] [background:conic-gradient(from_180deg,var(--color-primary),var(--color-secondary),var(--color-success),var(--color-primary))]">
            RBC
          </div>

          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-black tracking-tight text-[var(--surface-foreground)]">
              {activeStudio.label}
            </p>
            <p className="-mt-0.5 truncate text-[11px] font-medium text-[var(--theme-text-muted)]">
              {activeStudio.description}
            </p>
          </div>
        </div>

        <div className="mx-auto hidden items-center gap-1 rounded-2xl border border-[var(--theme-border-soft)] bg-[var(--surface-muted)] p-1 lg:flex">
          {studioNavItems.map((item) => {
            const active = item.href === pathname;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`h-9 rounded-xl px-3 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-focus-ring)] ${
                  active
                    ? "bg-[var(--surface-panel-strong)] text-[var(--surface-foreground)] shadow-sm"
                    : "text-[var(--theme-text-muted)] hover:bg-[var(--surface-panel-strong)] hover:text-[var(--surface-foreground)]"
                }`}
              >
                <span className="inline-flex h-full items-center">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex min-w-0 items-center justify-end gap-2">
          <button
            type="button"
            onClick={openCommandPalette}
            className="hidden h-9 items-center gap-2 rounded-xl border border-[var(--theme-border-soft)] bg-[var(--surface-panel-strong)] px-3 text-xs font-bold text-[var(--surface-foreground)] hover:bg-[var(--surface-card-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-focus-ring)] md:inline-flex"
          >
            <span>Commands</span>
            <span className="rounded-lg border border-[var(--theme-border-soft)] bg-[var(--surface-muted)] px-2 py-1 text-[10px] text-[var(--theme-text-muted)]">
              ⌘K
            </span>
          </button>

          <Link
            href="/studio/code"
            className="h-9 rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 text-xs font-black text-[var(--surface-on-primary)] shadow-[var(--shadow-soft)] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-focus-ring)]"
          >
            Export
          </Link>
        </div>
      </div>
    </header>
  );
}
