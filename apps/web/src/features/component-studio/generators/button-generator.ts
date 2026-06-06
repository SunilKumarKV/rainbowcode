import type {
  ButtonDefinition,
  ButtonSize,
  ButtonVariant,
} from "@/features/component-studio/types/component-definition";

const sizeClassMap: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

const variantClassMap: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white hover:opacity-90 focus-visible:ring-[var(--color-primary)]",
  secondary:
    "bg-[var(--color-secondary)] text-white hover:opacity-90 focus-visible:ring-[var(--color-secondary)]",
  outline:
    "border border-[var(--color-primary)] bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white focus-visible:ring-[var(--color-primary)]",
};

function escapeButtonLabel(label: string): string {
  return label.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function generateButtonCode(definition: ButtonDefinition): string {
  const sizeClasses = sizeClassMap[definition.size];
  const variantClasses = variantClassMap[definition.variant];

  return `<button
  type="button"
  className="inline-flex items-center justify-center rounded-[var(--radius-${definition.radius})] ${sizeClasses} font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variantClasses}"
>
  ${escapeButtonLabel(definition.label)}
</button>`;
}