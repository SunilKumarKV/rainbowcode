"use client";

import type { LogoConfig } from "@/features/logo-builder/types/logo";

function getGradientClass(direction: LogoConfig["gradientDirection"]): string {
  if (direction === "to-right") {
    return "bg-gradient-to-r";
  }

  if (direction === "to-bottom") {
    return "bg-gradient-to-b";
  }

  if (direction === "to-top-right") {
    return "bg-gradient-to-tr";
  }

  return "bg-gradient-to-br";
}

type LogoPreviewProps = {
  readonly logo: LogoConfig;
};

export function LogoPreview({ logo }: LogoPreviewProps) {
  const initials = (logo.text.trim() || "RBC").slice(0, 3).toUpperCase();

  return (
    <section
      aria-label="Logo preview"
      className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 p-4 shadow-[0_24px_90px_rgba(15,23,42,0.18)] dark:border-slate-800"
    >
      <div
        className="relative min-h-72 overflow-hidden rounded-[24px] p-6 text-white"
        style={{ backgroundColor: logo.backgroundColor, borderRadius: logo.radius }}
      >
        <div
          className="absolute -right-20 -top-24 size-64 rounded-full opacity-30 blur-3xl"
          style={{ backgroundColor: logo.primaryColor }}
        />
        <div
          className="absolute -bottom-20 -left-20 size-64 rounded-full opacity-30 blur-3xl"
          style={{ backgroundColor: logo.secondaryColor }}
        />

        <div className="relative z-10 flex min-h-60 items-center gap-6">
          <div
            className={`grid size-24 shrink-0 place-items-center rounded-[28px] ${getGradientClass(
              logo.gradientDirection,
            )} text-2xl font-black shadow-2xl`}
            style={
              {
                "--tw-gradient-from": logo.primaryColor,
                "--tw-gradient-to": logo.secondaryColor,
              } as React.CSSProperties
            }
          >
            {initials}
          </div>

          <div className="min-w-0">
            <h3
              className="truncate text-5xl font-black tracking-tight"
              style={{
                fontFamily: logo.fontFamily,
                fontWeight: logo.fontWeight,
                letterSpacing: logo.letterSpacing,
                backgroundImage: `linear-gradient(135deg, ${logo.primaryColor}, ${logo.secondaryColor})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {logo.text || "Logo"}
            </h3>

            <p
              className="mt-4 max-w-xl text-lg font-medium leading-7 text-white/72"
              style={{ fontFamily: logo.fontFamily }}
            >
              {logo.tagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}