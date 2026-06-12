"use client";

import { rbcField } from "@/lib/design-system/ui-tokens";
import type { ThemeTokens } from "@/features/theme-engine/types/theme-token";

type SpacingKey = keyof ThemeTokens["spacing"];

type SpacingTokenControlProps = {
  readonly label: string;
  readonly tokenKey: SpacingKey;
  readonly value: string;
  readonly onChange: (key: SpacingKey, value: string) => void;
};

export function SpacingTokenControl({
  label,
  tokenKey,
  value,
  onChange,
}: SpacingTokenControlProps) {
  const numericValue = Number.parseFloat(value.replace("rem", ""));

  return (
    <div className="rounded-2xl rbc-surface-muted p-3">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={`spacing-token-${tokenKey}`}
          className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--theme-text-subtle)]"
        >
          {label}
        </label>

        <span className="font-mono text-xs text-[var(--theme-text-muted)]">{value}</span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <input
          id={`spacing-token-${tokenKey}`}
          type="range"
          min="0"
          max="3"
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
          aria-label={`${label} spacing value`}
          onChange={(event) => onChange(tokenKey, event.currentTarget.value)}
          className={`w-24 font-mono ${rbcField}`}
        />
      </div>
    </div>
  );
}
