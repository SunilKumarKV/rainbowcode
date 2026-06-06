"use client";

import { ButtonControls } from "@/features/component-studio/components/button-controls";

export function ComponentStudioPanel() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Component Studio
        </p>
        <h3 className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">
          Button Builder
        </h3>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Build a reusable React button powered by theme tokens.
        </p>
      </section>

      <ButtonControls />
    </div>
  );
}