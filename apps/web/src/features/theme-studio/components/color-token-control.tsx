"use client";

import { rbcField } from "@/lib/design-system/ui-tokens";
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
    <div className="rounded-2xl rbc-surface-muted p-3">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={`color-token-${tokenKey}`}
          className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--theme-text-subtle)]"
        >
          {label}
        </label>

        <span className="font-mono text-xs text-[var(--theme-text-muted)]">{value}</span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <input
          id={`color-token-${tokenKey}`}
          type="color"
          value={value}
          onChange={(event) => onChange(tokenKey, event.currentTarget.value)}
          className="size-11 cursor-pointer rounded-2xl border border-[var(--theme-border-soft)] bg-[var(--surface-panel-strong)] p-1 shadow-sm"
        />

        <input
          type="text"
          value={value}
          aria-label={`${label} hex value`}
          onChange={(event) => onChange(tokenKey, event.currentTarget.value)}
          className={`min-w-0 flex-1 font-mono ${rbcField}`}
        />
      </div>
    </div>
  );
}
