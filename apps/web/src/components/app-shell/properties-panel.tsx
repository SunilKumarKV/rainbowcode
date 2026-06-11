"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RbcBadge } from "@/components/ui/rbc-badge";
import { ComponentStudioPanel } from "@/features/component-studio/components/component-studio-panel";
import { ThemeStudioPanel } from "@/features/theme-studio/components/theme-studio-panel";
import { BrandStudioPanel } from "@/features/brand-studio/components/brand-studio-panel";
import { ThemeExportPanel } from "@/features/theme-studio/components/theme-export-panel";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";
import { studioNavItems } from "@/lib/navigation/studio-nav";

export function PropertiesPanel() {
  const pathname = usePathname();
  const nodeCount = useCanvasStore((state) => state.nodes.length);

  if (pathname === "/studio/brand") {
    return <BrandStudioPanel />;
  }

  if (pathname === "/studio/theme") {
    return <ThemeStudioPanel />;
  }

  if (pathname === "/studio/components") {
    return <ComponentStudioPanel />;
  }

  if (pathname === "/studio/code") {
    return (
      <div className="space-y-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
            Code Studio
          </p>
          <h2 className="mt-2 text-sm font-black text-slate-950 dark:text-white">
            Export surfaces
          </h2>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Review current artifacts in the main workspace and export theme
            files from here.
          </p>
        </section>
        <ThemeExportPanel />
      </div>
    );
  }

  if (pathname === "/studio/canvas") {
    return (
      <div className="space-y-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
                Canvas Studio
              </p>
              <h2 className="mt-2 text-sm font-black text-slate-950 dark:text-white">
                Keyboard and export
              </h2>
            </div>

            <RbcBadge variant={nodeCount > 0 ? "success" : "neutral"}>
              {nodeCount} nodes
            </RbcBadge>
          </div>

          <div className="mt-4 space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/70">
              Use `Cmd/Ctrl + K` for commands and templates.
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/70">
              Use canvas export actions for TSX and JSON output.
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
              Inspector
            </p>
            <h2 className="mt-1 text-sm font-black text-slate-950 dark:text-white">
              Studio Overview
            </h2>
          </div>

          <RbcBadge variant="info">Open</RbcBadge>
        </div>

        <div className="mt-4 space-y-2">
          {studioNavItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
