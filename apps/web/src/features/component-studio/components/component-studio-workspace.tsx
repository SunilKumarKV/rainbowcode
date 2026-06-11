"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
import { BadgePreview } from "@/features/component-studio/components/badge-preview";
import { ButtonPreview } from "@/features/component-studio/components/button-preview";
import { CardPreview } from "@/features/component-studio/components/card-preview";
import { InputPreview } from "@/features/component-studio/components/input-preview";
import { exportBadgeComponent } from "@/features/component-studio/exporters/export-badge-component";
import { exportButtonComponent } from "@/features/component-studio/exporters/export-button-component";
import { exportCardComponent } from "@/features/component-studio/exporters/export-card-component";
import { exportInputComponent } from "@/features/component-studio/exporters/export-input-component";
import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";

function ComponentPreview() {
  const selectedComponent = useComponentStudioStore(
    (state) => state.selectedComponent,
  );

  if (selectedComponent === "button") {
    return <ButtonPreview />;
  }

  if (selectedComponent === "card") {
    return <CardPreview />;
  }

  if (selectedComponent === "input") {
    return <InputPreview />;
  }

  return <BadgePreview />;
}

function useSelectedComponentCode(): string {
  const selectedComponent = useComponentStudioStore(
    (state) => state.selectedComponent,
  );
  const buttonDefinition = useComponentStudioStore((state) => state.buttonDefinition);
  const cardDefinition = useComponentStudioStore((state) => state.cardDefinition);
  const inputDefinition = useComponentStudioStore((state) => state.inputDefinition);
  const badgeDefinition = useComponentStudioStore((state) => state.badgeDefinition);

  if (selectedComponent === "button") {
    return exportButtonComponent(buttonDefinition);
  }

  if (selectedComponent === "card") {
    return exportCardComponent(cardDefinition);
  }

  if (selectedComponent === "input") {
    return exportInputComponent(inputDefinition);
  }

  return exportBadgeComponent(badgeDefinition);
}

export function ComponentStudioWorkspace() {
  const selectedComponent = useComponentStudioStore(
    (state) => state.selectedComponent,
  );
  const selectedComponentCode = useSelectedComponentCode();

  return (
    <section className="space-y-6 rounded-[32px] border border-white/70 bg-white/68 p-5 shadow-[0_24px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/62 sm:p-6">
      <div className="overflow-hidden rounded-[28px] border border-white/70 bg-slate-950 text-white shadow-[0_24px_90px_rgba(15,23,42,0.18)] dark:border-white/10">
        <div className="relative overflow-hidden p-6 sm:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.32),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.22),transparent_34%)]" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <RbcBadge variant="info">Component Studio</RbcBadge>
              <RbcBadge variant="neutral">Selected: {selectedComponent}</RbcBadge>
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-5xl">
              Build token-aware UI primitives and review their generated TSX.
            </h1>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex min-h-[320px] items-center justify-center rounded-[28px] border border-white/70 bg-[linear-gradient(180deg,rgba(248,250,252,0.96),rgba(238,242,255,0.92))] p-6 shadow-[0_18px_70px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.92))]">
          <ComponentPreview />
        </div>

        <section className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 text-white shadow-[0_18px_70px_rgba(15,23,42,0.14)]">
          <div className="border-b border-white/10 bg-white/[0.03] px-5 py-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
              Generated component code
            </p>
          </div>

          <pre className="max-h-[460px] overflow-auto p-5 text-sm leading-6 text-slate-100">
            <code>{selectedComponentCode}</code>
          </pre>
        </section>
      </div>
    </section>
  );
}
