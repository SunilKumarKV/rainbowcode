"use client";

import { rbcField } from "@/lib/design-system/ui-tokens";
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
    <div className="rounded-2xl rbc-surface-muted p-3">
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
          className="min-w-0 flex-1 accent-[var(--color-primary)]"
        />

        <input
          type="text"
          value={value}
          aria-label={`${label} rem value`}
          onChange={(event) => onChange(tokenKey, event.currentTarget.value)}
          className={`w-24 font-mono ${rbcField}`}
        />
      </div>
    </div>
  );
}
