"use client";

import { useBrandStore } from "@/features/brand-studio/store/brand-store";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";
import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";
import { useThemeStore } from "@/features/theme-engine/store/theme-store";

export function RecentProjects() {
  const brand = useBrandStore((state) => state.brand);
  const theme = useThemeStore((state) => state.theme);
  const selectedComponent = useComponentStudioStore(
    (state) => state.selectedComponent,
  );
  const nodeCount = useCanvasStore((state) => state.nodes.length);

  const cards = [
    {
      label: "Brand kit",
      value: brand.name || "Unnamed workspace",
      detail: `${brand.palette.length} palette colors`,
      accent: "from-indigo-500 to-cyan-400",
    },
    {
      label: "Theme tokens",
      value: `${Object.keys(theme.colors).length} colors`,
      detail: `${Object.keys(theme.radius).length} radius tokens`,
      accent: "from-fuchsia-500 to-indigo-500",
    },
    {
      label: "Component focus",
      value: selectedComponent,
      detail: "Bundle exports available",
      accent: "from-emerald-500 to-cyan-400",
    },
    {
      label: "Canvas",
      value: `${nodeCount} nodes`,
      detail: nodeCount > 0 ? "Code export available" : "Ready for first layout",
      accent: "from-amber-500 to-orange-400",
    },
  ] as const;

  return (
    <section aria-labelledby="workspace-state-title">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
            Workspace
          </p>
          <h2
            id="workspace-state-title"
            className="mt-1 text-xl font-black tracking-tight text-slate-950 dark:text-white"
          >
            Current state
          </h2>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article
            key={card.label}
            className="group overflow-hidden rounded-[28px] border border-white/70 bg-white/82 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-slate-950/76"
          >
            <div className={`h-24 bg-gradient-to-br ${card.accent}`} />

            <div className="p-4">
              <p className="text-xs font-bold text-slate-500">
                {card.label}
              </p>

              <h3 className="mt-1 truncate text-base font-black text-slate-950 dark:text-white">
                {card.value}
              </h3>

              <p className="mt-3 text-xs text-slate-500">{card.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
