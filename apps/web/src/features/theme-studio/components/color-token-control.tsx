"use client";

import type { ThemeColorKey } from "@/features/theme-engine/types/theme-token";

type ColorTokenControlProps = {
  readonly label: string;
  readonly tokenKey: ThemeColorKey;
  readonly value: string;
  readonly onChange: (key: ThemeColorKey, value: string) => void;
};

export function ColorTokenControl({
  label,
  tokenKey,
  value,
  onChange,
}: ColorTokenControlProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={`color-token-${tokenKey}`}
          className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500"
        >
          {label}
        </label>

        <span className="font-mono text-xs text-slate-500">{value}</span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <input
          id={`color-token-${tokenKey}`}
          type="color"
          value={value}
          onChange={(event) => onChange(tokenKey, event.currentTarget.value)}
          className="size-11 cursor-pointer rounded-2xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        />

        <input
          type="text"
          value={value}
          aria-label={`${label} hex value`}
          onChange={(event) => onChange(tokenKey, event.currentTarget.value)}
          className="h-11 min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-3 font-mono text-sm font-semibold text-slate-950 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
        />
      </div>
    </div>
  );
}