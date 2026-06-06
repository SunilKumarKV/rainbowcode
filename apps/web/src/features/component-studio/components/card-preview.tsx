"use client";

import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";

const cardVariantClassMap = {
  simple:
    "border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white",
  feature:
    "border border-[var(--color-primary)] bg-white text-slate-950 shadow-xl dark:bg-slate-950 dark:text-white",
  pricing:
    "border border-[var(--color-secondary)] bg-white text-slate-950 shadow-xl dark:bg-slate-950 dark:text-white",
} as const;

export function CardPreview() {
  const cardDefinition = useComponentStudioStore(
    (state) => state.cardDefinition,
  );

  const title =
    cardDefinition.title.trim().length > 0
      ? cardDefinition.title
      : "Card title";

  const description =
    cardDefinition.description.trim().length > 0
      ? cardDefinition.description
      : "Card description will appear here.";

  const actionLabel =
    cardDefinition.actionLabel.trim().length > 0
      ? cardDefinition.actionLabel
      : "Action";

  return (
    <article
      aria-label="Card component preview"
      className={`w-full max-w-xl rounded-[var(--radius-${cardDefinition.radius})] p-6 ${cardVariantClassMap[cardDefinition.variant]}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        Card Preview
      </p>

      <h3 className="mt-3 text-xl font-bold">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {description}
      </p>

      {cardDefinition.showAction ? (
        <button
          type="button"
          className="mt-6 inline-flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        >
          {actionLabel}
        </button>
      ) : null}
    </article>
  );
}