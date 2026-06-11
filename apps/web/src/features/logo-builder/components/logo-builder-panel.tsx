"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcButton } from "@/components/ui/rbc-button";
import { exportLogoSvg } from "@/features/logo-builder/exporters/export-logo-svg";
import { LogoControls } from "@/features/logo-builder/components/logo-controls";
import { LogoPreview } from "@/features/logo-builder/components/logo-preview";
import { useLogoStore } from "@/features/logo-builder/store/logo-store";
import { downloadFile } from "@/features/theme-engine/exporters/download-file";

export function LogoBuilderPanel() {
  const logo = useLogoStore((state) => state.logo);
  const resetLogo = useLogoStore((state) => state.resetLogo);

  function handleExportSvg(): void {
    downloadFile("rainbowcode-logo.svg", exportLogoSvg(logo), "image/svg+xml");
  }

  return (
    <section className="overflow-hidden rounded-[28px] border border-white/70 bg-white/78 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/76">
      <div className="relative overflow-hidden border-b border-slate-200/70 p-4 dark:border-slate-800">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-fuchsia-400/20 blur-2xl" />

        <div className="relative z-10 flex items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap gap-2">
              <RbcBadge variant="info">Logo Builder</RbcBadge>
              <RbcBadge variant="success">SVG Export</RbcBadge>
            </div>

            <h3 className="mt-3 text-lg font-black tracking-tight text-slate-950 dark:text-white">
              Visual logo system
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Create a text-based brand mark with typography, gradient, preview,
              and exportable SVG.
            </p>
          </div>

          <RbcButton variant="ghost" onClick={resetLogo}>
            Reset
          </RbcButton>
        </div>
      </div>

      <div className="grid gap-5 p-4 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <LogoPreview logo={logo} />

        <div className="space-y-4">
          <LogoControls />
          <RbcButton variant="primary" onClick={handleExportSvg} className="w-full">
            Export Logo SVG
          </RbcButton>
        </div>
      </div>
    </section>
  );
}