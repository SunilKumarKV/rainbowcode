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
    <div className="space-y-2">
      <label
        htmlFor={`color-token-${tokenKey}`}
        className="text-xs font-medium text-slate-600 dark:text-slate-400"
      >
        {label}
      </label>

      <div className="flex items-center gap-2">
        <input
          id={`color-token-${tokenKey}`}
          type="color"
          value={value}
          onChange={(event) => onChange(tokenKey, event.currentTarget.value)}
          className="size-10 cursor-pointer rounded-xl border border-slate-200 bg-transparent p-1 dark:border-slate-800"
        />

        <input
          type="text"
          value={value}
          aria-label={`${label} hex value`}
          onChange={(event) => onChange(tokenKey, event.currentTarget.value)}
          className="h-10 min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none focus:bg-white focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700"
        />
      </div>
    </div>
  );
}