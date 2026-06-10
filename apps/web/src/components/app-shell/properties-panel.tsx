"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcPanel } from "@/components/ui/rbc-panel";
import { ComponentStudioPanel } from "@/features/component-studio/components/component-studio-panel";
import { ThemeStudioPanel } from "@/features/theme-studio/components/theme-studio-panel";

export function PropertiesPanel() {
  return (
    <aside
      aria-label="Properties and controls"
      className="space-y-4 rounded-[28px] border border-white/70 bg-white/72 p-4 shadow-[0_24px_90px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/72"
    >
      <RbcPanel eyebrow="Control Center" title="Studio Intelligence">
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
          Tune design tokens, component variants, and visual canvas output from
          one production-grade control surface.
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-900">
            <p className="text-xs text-slate-500">Theme</p>
            <p className="mt-1 text-sm font-black text-slate-950 dark:text-white">
              Live
            </p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-900">
            <p className="text-xs text-slate-500">Code</p>
            <p className="mt-1 text-sm font-black text-slate-950 dark:text-white">
              Ready
            </p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-900">
            <p className="text-xs text-slate-500">Canvas</p>
            <p className="mt-1 text-sm font-black text-slate-950 dark:text-white">
              V1
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <RbcBadge variant="success">Tokens</RbcBadge>
          <RbcBadge variant="info">Components</RbcBadge>
          <RbcBadge variant="neutral">Export</RbcBadge>
        </div>
      </RbcPanel>

      <ThemeStudioPanel />
      <ComponentStudioPanel />
    </aside>
  );
}