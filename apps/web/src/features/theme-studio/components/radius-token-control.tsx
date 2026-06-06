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
    <div className="space-y-2">
      <label
        htmlFor={`radius-token-${tokenKey}`}
        className="text-xs font-medium text-slate-600 dark:text-slate-400"
      >
        {label}
      </label>

      <div className="flex items-center gap-2">
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
          className="min-w-0 flex-1 accent-slate-950 dark:accent-white"
        />

        <input
          type="text"
          value={value}
          aria-label={`${label} rem value`}
          onChange={(event) => onChange(tokenKey, event.currentTarget.value)}
          className="h-10 w-24 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none focus:bg-white focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700"
        />
      </div>
    </div>
  );
}