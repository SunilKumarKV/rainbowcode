"use client";

import type { ThemeTokens } from "@/features/theme-engine/types/theme-token";

type RadiusKey = keyof ThemeTokens["radius"];

type RadiusTokenControlProps = {
  readonly label: string;
  readonly tokenKey: RadiusKey;
  readonly value: string;
  readonly onChange: (key: RadiusKey, value: string) => void;
};

export function RadiusTokenControl({
  label,
  tokenKey,
  value,
  onChange,
}: RadiusTokenControlProps) {
  const numericValue = Number.parseFloat(value.replace("rem", ""));

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={`radius-token-${tokenKey}`}
          className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500"
        >
          {label}
        </label>

        <span className="font-mono text-xs text-slate-500">{value}</span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <input
          id={`radius-token-${tokenKey}`}
          type="range"
          min="0"
          max="2"
          step="0.125"
          value={Number.isFinite(numericValue) ? numericValue : 0}
          onChange={(event) =>
            onChange(tokenKey, `${event.currentTarget.value}rem`)
          }
          className="min-w-0 flex-1 accent-indigo-600 dark:accent-indigo-300"
        />

        <input
          type="text"
          value={value}
          aria-label={`${label} rem value`}
          onChange={(event) => onChange(tokenKey, event.currentTarget.value)}
          className="h-11 w-24 rounded-2xl border border-slate-200 bg-white px-3 font-mono text-sm font-semibold text-slate-950 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
        />
      </div>
    </div>
  );
}