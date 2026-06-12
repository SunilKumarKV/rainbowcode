"use client";

import { rbcField } from "@/lib/design-system/ui-tokens";

type TypographyTokenControlProps = {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
};

export function TypographyTokenControl({
  id,
  label,
  description,
  value,
  onChange,
  placeholder,
}: TypographyTokenControlProps) {
  return (
    <div className="rounded-2xl rbc-surface-muted p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <label
            htmlFor={id}
            className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--theme-text-subtle)]"
          >
            {label}
          </label>
          <p className="mt-1 text-xs leading-5 text-[var(--theme-text-muted)]">
            {description}
          </p>
        </div>
      </div>

      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.currentTarget.value)}
        className={`mt-3 w-full ${rbcField}`}
      />
    </div>
  );
}
