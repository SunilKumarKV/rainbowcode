import type {
  CardDefinition,
  CardVariant,
} from "@/features/component-studio/types/component-definition";

const cardVariantClassMap: Record<CardVariant, string> = {
  simple:
    "border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white",
  feature:
    "border border-[var(--color-primary)] bg-white text-slate-950 shadow-xl dark:bg-slate-950 dark:text-white",
  pricing:
    "border border-[var(--color-secondary)] bg-white text-slate-950 shadow-xl dark:bg-slate-950 dark:text-white",
};

function escapeText(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function generateCardCode(definition: CardDefinition): string {
  const variantClasses = cardVariantClassMap[definition.variant];

  const actionCode = definition.showAction
    ? `

    <button
      type="button"
      className="mt-6 inline-flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
    >
      ${escapeText(definition.actionLabel)}
    </button>`
    : "";

  return `<article
  className="rounded-[var(--radius-${definition.radius})] p-6 ${variantClasses}"
>
  <h3 className="text-xl font-bold">
    ${escapeText(definition.title)}
  </h3>

  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
    ${escapeText(definition.description)}
  </p>${actionCode}
</article>`;
}