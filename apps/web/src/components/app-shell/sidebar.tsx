"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { RbcBadge } from "@/components/ui/rbc-badge";
import { useBrandStore } from "@/features/brand-studio/store/brand-store";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";
import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";
import { useThemeStore } from "@/features/theme-engine/store/theme-store";
import { studioNavItems } from "@/lib/navigation/studio-nav";
import { useAppShellStore } from "@/stores/app-shell-store";

export function Sidebar() {
  const pathname = usePathname();
  const isSidebarOpen = useAppShellStore((state) => state.isSidebarOpen);
  const brand = useBrandStore((state) => state.brand);
  const theme = useThemeStore((state) => state.theme);
  const selectedComponent = useComponentStudioStore(
    (state) => state.selectedComponent,
  );
  const nodeCount = useCanvasStore((state) => state.nodes.length);

  const studioSummary = useMemo(
    () => [
      {
        label: "Brand colors",
        value: `${brand.palette.length}`,
      },
      {
        label: "Theme tokens",
        value: `${Object.keys(theme.colors).length + Object.keys(theme.radius).length}`,
      },
      {
        label: "Component",
        value: selectedComponent,
      },
      {
        label: "Canvas nodes",
        value: `${nodeCount}`,
      },
    ],
    [brand.palette.length, nodeCount, selectedComponent, theme.colors, theme.radius],
  );

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
          {studioNavItems.slice(1).map((item) => {
            const active = pathname === item.href;
            const icon =
              item.studio === "brand"
                ? "B"
                : item.studio === "theme"
                  ? "T"
                  : item.studio === "components"
                    ? "C"
                    : item.studio === "canvas"
                      ? "V"
                      : "</>";

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={`grid size-10 place-items-center rounded-2xl text-xs font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  active
                    ? "bg-slate-950 text-white shadow-lg shadow-slate-950/15 dark:bg-white dark:text-slate-950"
                    : "text-slate-500 hover:bg-white hover:text-slate-950 dark:hover:bg-slate-800 dark:hover:text-white"
                }`}
              >
                {icon}
              </Link>
            );
          })}
        </nav>

        <div className="flex min-h-0 flex-col p-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
                  Workspace
                </p>
                <h2 className="mt-2 truncate text-sm font-black text-slate-950 dark:text-white">
                  {brand.name.trim().length > 0 ? brand.name : "Unnamed workspace"}
                </h2>
                <p className="mt-1 text-xs text-slate-500">{brand.slogan}</p>
              </div>

              <RbcBadge variant={nodeCount > 0 ? "success" : "neutral"}>
                {nodeCount > 0 ? "In progress" : "Empty canvas"}
              </RbcBadge>
            </div>
          </section>

          <section className="mt-3 min-h-0 flex-1 overflow-y-auto">
            <p className="px-1 text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">
              Studios
            </p>

            <div className="mt-2 space-y-1">
              {studioNavItems.map((item) => {
                const active = pathname === item.href;

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
                        {active ? <RbcBadge variant="info">Open</RbcBadge> : null}
                      </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-4">
              <p className="px-1 text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">
                Current State
              </p>

              <div className="mt-2 space-y-1">
                {studioSummary.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300"
                  >
                    <span>{item.label}</span>
                    <span className="truncate text-slate-500 dark:text-slate-400">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
}
