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
    <section className="overflow-hidden rounded-[28px] rbc-surface-card">
      <div className="relative overflow-hidden border-b border-[var(--theme-border-soft)] p-4">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-fuchsia-400/20 blur-2xl" />

        <div className="relative z-10">
          <div className="flex flex-wrap gap-2">
            <RbcBadge variant="info">Component Studio</RbcBadge>
            <RbcBadge variant="success">Code Ready</RbcBadge>
          </div>

          <h3 className="mt-3 text-lg font-black tracking-tight text-[var(--surface-foreground)]">
            Visual component builder
          </h3>

          <p className="mt-1 text-xs leading-5 text-[var(--theme-text-muted)]">
            Build reusable React UI primitives powered by RainbowCode theme
            tokens.
          </p>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="rounded-3xl rbc-surface-muted p-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--theme-text-subtle)]">
                Selected
              </p>
              <p className="mt-1 text-sm font-black text-[var(--surface-foreground)]">
                {componentLabels[selectedComponent]}
              </p>
            </div>

            <RbcBadge variant="neutral">Variant</RbcBadge>
          </div>

          <div className="mt-3">
            <ComponentTypeSwitcher />
          </div>
        </div>

        <div className="rounded-3xl rbc-surface-muted p-3">
          {selectedComponent === "button" ? <ButtonControls /> : null}
          {selectedComponent === "card" ? <CardControls /> : null}
          {selectedComponent === "input" ? <InputControls /> : null}
          {selectedComponent === "badge" ? <BadgeControls /> : null}
        </div>
      </div>
    </section>
  );
}
