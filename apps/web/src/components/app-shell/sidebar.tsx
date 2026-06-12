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
      className={`min-h-0 border-r border-[var(--theme-border-soft)] bg-[var(--surface-panel)] backdrop-blur-2xl ${
        isSidebarOpen ? "block" : "hidden lg:block"
      }`}
    >
      <div className="grid h-full min-h-0 grid-cols-[56px_minmax(0,1fr)]">
        <nav
          aria-label="Primary editor modes"
          className="flex flex-col items-center gap-2 border-r border-[var(--theme-border-soft)] bg-[var(--surface-muted)] p-2"
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
                className={`grid size-10 place-items-center rounded-2xl text-xs font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-focus-ring)] ${
                  active
                    ? "bg-[var(--color-primary)] text-[var(--surface-on-primary)] shadow-[var(--shadow-soft)]"
                    : "text-[var(--theme-text-muted)] hover:bg-[var(--surface-panel-strong)] hover:text-[var(--surface-foreground)]"
                }`}
              >
                {icon}
              </Link>
            );
          })}
        </nav>

        <div className="flex min-h-0 flex-col p-3">
          <section className="rounded-2xl rbc-surface-panel p-3 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-primary)]">
                  Workspace
                </p>
                <h2 className="mt-2 truncate text-sm font-black text-[var(--surface-foreground)]">
                  {brand.name.trim().length > 0 ? brand.name : "Unnamed workspace"}
                </h2>
                <p className="mt-1 text-xs text-[var(--theme-text-muted)]">{brand.slogan}</p>
              </div>

              <RbcBadge variant={nodeCount > 0 ? "success" : "neutral"}>
                {nodeCount > 0 ? "In progress" : "Empty canvas"}
              </RbcBadge>
            </div>
          </section>

          <section className="mt-3 min-h-0 flex-1 overflow-y-auto">
            <p className="px-1 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--theme-text-subtle)]">
              Studios
            </p>

            <div className="mt-2 space-y-1">
              {studioNavItems.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-2xl border px-3 py-2.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-focus-ring)] ${
                      active
                        ? "border-[var(--color-primary)] bg-[var(--surface-accent-soft)] text-[var(--color-primary)]"
                        : "border-transparent text-[var(--surface-foreground)] hover:bg-[var(--surface-muted)]"
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
              <p className="px-1 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--theme-text-subtle)]">
                Current State
              </p>

              <div className="mt-2 space-y-1">
                {studioSummary.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-3 rounded-xl rbc-surface-muted px-3 py-2 text-xs font-bold"
                  >
                    <span>{item.label}</span>
                    <span className="truncate text-[var(--theme-text-muted)]">
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
