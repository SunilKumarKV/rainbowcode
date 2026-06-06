"use client";

import { BadgeControls } from "@/features/component-studio/components/badge-controls";
import { ButtonControls } from "@/features/component-studio/components/button-controls";
import { CardControls } from "@/features/component-studio/components/card-controls";
import { ComponentTypeSwitcher } from "@/features/component-studio/components/component-type-switcher";
import { InputControls } from "@/features/component-studio/components/input-controls";
import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";

export function ComponentStudioPanel() {
  const selectedComponent = useComponentStudioStore(
    (state) => state.selectedComponent,
  );

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Component Studio
        </p>
        <h3 className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">
          Visual Component Builder
        </h3>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Build reusable React components powered by theme tokens.
        </p>
      </section>

      <ComponentTypeSwitcher />

      {selectedComponent === "button" ? <ButtonControls /> : null}
      {selectedComponent === "card" ? <CardControls /> : null}
      {selectedComponent === "input" ? <InputControls /> : null}
      {selectedComponent === "badge" ? <BadgeControls /> : null}
    </div>
  );
}