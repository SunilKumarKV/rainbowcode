"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
import { useBrandStore } from "@/features/brand-studio/store/brand-store";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";
import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";
import { QuickActions } from "@/features/dashboard/components/quick-actions";
import { RecentProjects } from "@/features/dashboard/components/recent-projects";
import { StudioModules } from "@/features/dashboard/components/studio-modules";
import { ActivityFeed } from "@/features/dashboard/components/activity-feed";
import { useThemeStore } from "@/features/theme-engine/store/theme-store";

export function StudioHome() {
  const brand = useBrandStore((state) => state.brand);
  const nodeCount = useCanvasStore((state) => state.nodes.length);
  const selectedComponent = useComponentStudioStore(
    (state) => state.selectedComponent,
  );
  const colorTokenCount = useThemeStore(
    (state) => Object.keys(state.theme.colors).length,
  );

  return (
    <section
      aria-label="RainbowCode studio home"
      className="space-y-8 rounded-[36px] border border-white/70 bg-white/58 p-5 shadow-[0_24px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/58 sm:p-7"
    >
      <div className="relative overflow-hidden rounded-[34px] border border-white/70 bg-slate-950 p-6 text-white shadow-[0_30px_110px_rgba(15,23,42,0.24)] dark:border-white/10 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.5),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(219,39,119,0.32),transparent_34%)]" />

        <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <RbcBadge variant="info">RainbowCode Studio</RbcBadge>
              <RbcBadge variant="neutral">Single workspace</RbcBadge>
            </div>

            <h1 className="mt-4 text-4xl font-black tracking-[-0.055em] sm:text-6xl">
              Work from one live design system instead of scattered files.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              This overview reflects the current local workspace: brand
              identity, validated theme tokens, component configuration, canvas
              progress, and export availability.
            </p>
          </div>

          <div className="grid min-w-64 gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
            <div>
              <p className="text-xs text-slate-400">Workspace</p>
              <p className="mt-1 text-lg font-black">
                {brand.name.trim().length > 0 ? brand.name : "Unnamed workspace"}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                `${colorTokenCount} tokens`,
                `${selectedComponent}`,
                `${nodeCount} nodes`,
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3"
                >
                  <p className="text-xs font-black">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <QuickActions />
      <RecentProjects />
      <StudioModules />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-[28px] border border-white/70 bg-white/82 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/76">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
            Workspace note
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
            No fake projects, no seeded metrics
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            The studio starts from a clean local workspace. Create real brand,
            theme, component, and canvas state here, then export the resulting
            artifacts when you are ready.
          </p>
        </div>

        <ActivityFeed />
      </div>
    </section>
  );
}
