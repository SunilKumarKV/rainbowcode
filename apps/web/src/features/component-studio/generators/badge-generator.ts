import type {
  BadgeDefinition,
  BadgeSize,
  BadgeVariant,
} from "@/features/component-studio/types/component-definition";

const badgeSizeClassMap: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
  lg: "px-3 py-1.5 text-sm",
};

const badgeVariantClassMap: Record<BadgeVariant, string> = {
  primary: "bg-[var(--color-primary)] text-white",
  secondary: "bg-[var(--color-secondary)] text-white",
  success: "bg-[var(--color-success)] text-white",
  warning: "bg-[var(--color-warning)] text-slate-950",
  destructive: "bg-[var(--color-destructive)] text-white",
  outline:
    "border border-[var(--color-primary)] bg-transparent text-[var(--color-primary)]",
};

function escapeText(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function generateBadgeCode(definition: BadgeDefinition): string {
  const sizeClasses = badgeSizeClassMap[definition.size];
  const variantClasses = badgeVariantClassMap[definition.variant];

  return `<span
  className="inline-flex items-center rounded-[var(--radius-${definition.radius})] ${sizeClasses} font-semibold ${variantClasses}"
>
  ${escapeText(definition.label)}
</span>`;
}