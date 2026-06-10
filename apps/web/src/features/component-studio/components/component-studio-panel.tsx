"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
import { BadgeControls } from "@/features/component-studio/components/badge-controls";
import { ButtonControls } from "@/features/component-studio/components/button-controls";
import { CardControls } from "@/features/component-studio/components/card-controls";
import { ComponentTypeSwitcher } from "@/features/component-studio/components/component-type-switcher";
import { InputControls } from "@/features/component-studio/components/input-controls";
import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";

const componentLabels = {
  button: "Button",
  card: "Card",
  input: "Input",
  badge: "Badge",
} as const;

export function ComponentStudioPanel() {
  const selectedComponent = useComponentStudioStore(
    (state) => state.selectedComponent,
  );

  return (
    <section className="overflow-hidden rounded-[28px] border border-white/70 bg-white/78 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/76">
      <div className="relative overflow-hidden border-b border-slate-200/70 p-4 dark:border-slate-800">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-fuchsia-400/20 blur-2xl" />

        <div className="relative z-10">
          <div className="flex flex-wrap gap-2">
            <RbcBadge variant="info">Component Studio</RbcBadge>
            <RbcBadge variant="success">Code Ready</RbcBadge>
          </div>

          <h3 className="mt-3 text-lg font-black tracking-tight text-slate-950 dark:text-white">
            Visual component builder
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Build reusable React UI primitives powered by RainbowCode theme
            tokens.
          </p>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Selected
              </p>
              <p className="mt-1 text-sm font-black text-slate-950 dark:text-white">
                {componentLabels[selectedComponent]}
              </p>
            </div>

            <RbcBadge variant="neutral">Variant</RbcBadge>
          </div>

          <div className="mt-3">
            <ComponentTypeSwitcher />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/70">
          {selectedComponent === "button" ? <ButtonControls /> : null}
          {selectedComponent === "card" ? <CardControls /> : null}
          {selectedComponent === "input" ? <InputControls /> : null}
          {selectedComponent === "badge" ? <BadgeControls /> : null}
        </div>
      </div>
    </section>
  );
}