"use client";

import { exportBrandJson } from "@/features/brand-studio/exporters/export-brand-json";
import { useBrandStore } from "@/features/brand-studio/store/brand-store";
import { exportCanvasComponent } from "@/features/canvas-studio/exporters/export-canvas-component";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";
import { exportComponentBundle } from "@/features/component-studio/exporters/export-component-bundle";
import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";
import { exportCssTheme } from "@/features/theme-engine/exporters/export-css";
import { useThemeStore } from "@/features/theme-engine/store/theme-store";

function CodeSection({
  title,
  description,
  code,
}: {
  readonly title: string;
  readonly description: string;
  readonly code: string;
}) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 text-white shadow-[0_18px_70px_rgba(15,23,42,0.14)]">
      <div className="border-b border-white/10 bg-white/[0.03] px-5 py-4">
        <h2 className="text-sm font-black">{title}</h2>
        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>

      <pre className="max-h-72 overflow-auto p-5 text-sm leading-6 text-slate-100">
        <code>{code}</code>
      </pre>
    </section>
  );
}

export function CodeStudioWorkspace() {
  const brand = useBrandStore((state) => state.brand);
  const theme = useThemeStore((state) => state.theme);
  const nodes = useCanvasStore((state) => state.nodes);
  const buttonDefinition = useComponentStudioStore((state) => state.buttonDefinition);
  const cardDefinition = useComponentStudioStore((state) => state.cardDefinition);
  const inputDefinition = useComponentStudioStore((state) => state.inputDefinition);
  const badgeDefinition = useComponentStudioStore((state) => state.badgeDefinition);

  const bundle = exportComponentBundle({
    buttonDefinition,
    cardDefinition,
    inputDefinition,
    badgeDefinition,
  });

  return (
    <section className="space-y-6 rounded-[32px] border border-white/70 bg-white/68 p-5 shadow-[0_24px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/62 sm:p-6">
      <div className="overflow-hidden rounded-[28px] border border-white/70 bg-slate-950 text-white shadow-[0_24px_90px_rgba(15,23,42,0.18)] dark:border-white/10">
        <div className="relative overflow-hidden p-6 sm:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.24),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.24),transparent_34%)]" />

          <div className="relative z-10 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-200">
              Code Studio
            </p>
            <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-5xl">
              Review the actual artifacts generated from the current workspace.
            </h1>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <CodeSection
          title="Brand Kit JSON"
          description="Current brand identity payload."
          code={exportBrandJson(brand)}
        />
        <CodeSection
          title="Theme CSS"
          description="Runtime CSS variables generated from theme tokens."
          code={exportCssTheme(theme)}
        />
        <CodeSection
          title="Canvas TSX"
          description={
            nodes.length > 0
              ? "React/Tailwind output from the current canvas."
              : "Canvas is empty. Add nodes in Canvas Studio to generate TSX."
          }
          code={
            nodes.length > 0
              ? exportCanvasComponent(nodes)
              : "/* No canvas nodes yet. */"
          }
        />
        <CodeSection
          title="Component Bundle Index"
          description="Bundle export inventory for the current component set."
          code={bundle.map((file) => `${file.filename}\n`).join("")}
        />
      </div>
    </section>
  );
}
