"use client";

import type { ReactNode } from "react";
import { Sidebar } from "@/components/app-shell/sidebar";
import { Topbar } from "@/components/app-shell/topbar";
import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcButton } from "@/components/ui/rbc-button";
import { RbcCard } from "@/components/ui/rbc-card";
import { RbcPanel } from "@/components/ui/rbc-panel";
import { useBrandStore } from "@/features/brand-studio/store/brand-store";
import { ButtonPreview } from "@/features/component-studio/components/button-preview";
import { CardPreview } from "@/features/component-studio/components/card-preview";
import { InputPreview } from "@/features/component-studio/components/input-preview";
import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";
import { useThemeStore } from "@/features/theme-engine/store/theme-store";

type PreviewCardProps = {
  readonly title: string;
  readonly description: string;
  readonly children: ReactNode;
};

function PreviewCard({ title, description, children }: PreviewCardProps) {
  return (
    <section className="overflow-hidden rounded-[28px] rbc-surface-card">
      <div className="border-b border-[var(--theme-border-soft)] px-5 py-4">
        <p className="text-sm font-black text-[var(--surface-foreground)]">{title}</p>
        <p className="mt-1 text-xs leading-5 text-[var(--theme-text-muted)]">
          {description}
        </p>
      </div>

      <div className="p-5">{children}</div>
    </section>
  );
}

function ThemeDashboardPreview() {
  const brand = useBrandStore((state) => state.brand);
  const selectedComponent = useComponentStudioStore(
    (state) => state.selectedComponent,
  );
  const nodeCount = useCanvasStore((state) => state.nodes.length);
  const activePresetId = useThemeStore((state) => state.activePresetId);
  const theme = useThemeStore((state) => state.theme);

  return (
    <div
      aria-label="Dashboard preview"
      className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
    >
      <RbcPanel
        eyebrow="Dashboard"
        title={brand.name.trim().length > 0 ? brand.name : "Workspace"}
        className="rounded-[24px] p-5"
      >
        <p className="text-sm leading-6 text-[var(--theme-text-muted)]">
          {brand.slogan.trim().length > 0
            ? brand.slogan
            : "Theme changes propagate immediately across shared UI and export output."}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <RbcBadge variant="info">
            {activePresetId === "custom" ? "Custom theme" : `${activePresetId} preset`}
          </RbcBadge>
          <RbcBadge variant="success">{selectedComponent} ready</RbcBadge>
          <RbcBadge variant="neutral">{nodeCount} canvas nodes</RbcBadge>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <RbcButton variant="primary">Publish theme</RbcButton>
          <RbcButton variant="secondary">Export tokens</RbcButton>
        </div>
      </RbcPanel>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <RbcCard className="p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--theme-text-subtle)]">
            Color system
          </p>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {Object.entries(theme.colors).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div
                  className="h-12 rounded-2xl border border-[var(--theme-border-soft)]"
                  style={{ backgroundColor: value }}
                />
                <p className="truncate text-[10px] font-black uppercase tracking-[0.14em] text-[var(--theme-text-subtle)]">
                  {key}
                </p>
              </div>
            ))}
          </div>
        </RbcCard>

        <RbcCard className="p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--theme-text-subtle)]">
            System rhythm
          </p>
          <div className="mt-4 space-y-3">
            {Object.entries(theme.spacing).map(([key, value]) => (
              <div key={key} className="flex items-center gap-3">
                <span className="w-8 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--theme-text-subtle)]">
                  {key}
                </span>
                <div
                  className="h-3 rounded-full bg-[var(--color-primary)]"
                  style={{ width: `calc(${value} * 2.5)` }}
                />
                <span className="font-mono text-xs text-[var(--theme-text-muted)]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </RbcCard>
      </div>
    </div>
  );
}

export function ThemePreview() {
  return (
    <section aria-label="Live theme preview workspace" className="space-y-6">
      <div className="overflow-hidden rounded-[28px] rbc-surface-card">
        <div className="border-b border-[var(--theme-border-soft)] px-5 py-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-primary)]">
            Preview workspace
          </p>
          <h2 className="mt-3 text-2xl font-black text-[var(--surface-foreground)]">
            Real RainbowCode surfaces, live theme runtime
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--theme-text-muted)]">
            Presets and token edits apply instantly to the shell, studio chrome,
            component previews, and export output with no refresh.
          </p>
        </div>

        <div className="p-5">
          <div className="grid gap-4 xl:grid-cols-2">
            <PreviewCard
              title="Navbar Preview"
              description="The shared app shell top navigation using live theme tokens."
            >
              <div aria-label="Navbar preview" className="overflow-hidden rounded-[24px] border border-[var(--theme-border-soft)]">
                <Topbar />
              </div>
            </PreviewCard>

            <PreviewCard
              title="Sidebar Preview"
              description="The route-aware studio sidebar with real store-backed state."
            >
              <div
                aria-label="Sidebar preview"
                className="overflow-hidden rounded-[24px] border border-[var(--theme-border-soft)]"
              >
                <div className="grid min-h-[400px] grid-cols-[312px_minmax(0,1fr)]">
                  <Sidebar />
                  <div className="rbc-surface-editor" />
                </div>
              </div>
            </PreviewCard>
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-3">
            <PreviewCard
              title="Button Preview"
              description="The current component-studio button rendered with live runtime variables."
            >
              <div aria-label="Button preview" className="flex min-h-[280px] items-center justify-center rounded-[24px] rbc-surface-muted p-4">
                <ButtonPreview />
              </div>
            </PreviewCard>

            <PreviewCard
              title="Input Preview"
              description="The current input definition with theme-aware radius, border, and focus states."
            >
              <div aria-label="Input preview" className="flex min-h-[280px] items-center justify-center rounded-[24px] rbc-surface-muted p-4">
                <InputPreview />
              </div>
            </PreviewCard>

            <PreviewCard
              title="Card Preview"
              description="The current card definition using shared surfaces and token-driven accents."
            >
              <div aria-label="Card preview" className="flex min-h-[280px] items-center justify-center rounded-[24px] rbc-surface-muted p-4">
                <CardPreview />
              </div>
            </PreviewCard>
          </div>

          <div className="mt-4">
            <PreviewCard
              title="Dashboard Preview"
              description="A live workspace summary composed from real product primitives and current store state."
            >
              <ThemeDashboardPreview />
            </PreviewCard>
          </div>
        </div>
      </div>
    </section>
  );
}
