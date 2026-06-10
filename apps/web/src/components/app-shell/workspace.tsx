"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcButton } from "@/components/ui/rbc-button";
import { RbcCard } from "@/components/ui/rbc-card";
import { CanvasStudioPanel } from "@/features/canvas-studio/components/canvas-studio-panel";

export function Workspace() {
  return (
    <RbcCard className="overflow-hidden p-0">
      <section
        aria-label="Main editing workspace"
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.12),transparent_28%)]" />

        <div className="relative z-10 border-b border-slate-200/70 px-5 py-5 dark:border-slate-800 sm:px-7 sm:py-6">
          <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2">
                <RbcBadge variant="success">Canvas V1 Ready</RbcBadge>
                <RbcBadge variant="info">Visual Builder</RbcBadge>
                <RbcBadge variant="neutral">Production Export</RbcBadge>
              </div>

              <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl">
                Design visually. Ship clean code.
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
                Create layouts, compose components, group canvas objects, manage
                design tokens, and export production-ready React/Tailwind from a
                single global studio.
              </p>
            </div>

            <div className="grid min-w-64 gap-3 rounded-3xl border border-white/70 bg-white/70 p-4 shadow-xl shadow-slate-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Current studio</span>
                <RbcBadge variant="success">Active</RbcBadge>
              </div>

              <p className="text-lg font-black text-slate-950 dark:text-white">
                Canvas Studio
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-900">
                  <p className="text-slate-500">Mode</p>
                  <p className="mt-1 font-bold text-slate-950 dark:text-white">
                    Editor
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-900">
                  <p className="text-slate-500">Next</p>
                  <p className="mt-1 font-bold text-slate-950 dark:text-white">
                    Brand
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <RbcButton variant="secondary" className="flex-1">
                  Templates
                </RbcButton>
                <RbcButton variant="primary" className="flex-1">
                  Export
                </RbcButton>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 p-4 sm:p-6">
          <CanvasStudioPanel />
        </div>
      </section>
    </RbcCard>
  );
}