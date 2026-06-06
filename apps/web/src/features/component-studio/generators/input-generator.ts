import type {
  InputDefinition,
  InputSize,
  InputVariant,
} from "@/features/component-studio/types/component-definition";

const inputSizeClassMap: Record<InputSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

const inputVariantClassMap: Record<InputVariant, string> = {
  default:
    "border border-slate-300 bg-white text-slate-950 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white",
  filled:
    "border border-transparent bg-slate-100 text-slate-950 placeholder:text-slate-500 dark:bg-slate-900 dark:text-white",
  outline:
    "border border-[var(--color-primary)] bg-transparent text-slate-950 placeholder:text-slate-400 dark:text-white",
};

function escapeText(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function generateInputCode(definition: InputDefinition): string {
  const sizeClasses = inputSizeClassMap[definition.size];
  const variantClasses = inputVariantClassMap[definition.variant];
  const disabledAttribute = definition.disabled ? " disabled" : "";

  return `<label className="block">
  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
    ${escapeText(definition.label)}
  </span>

  <input
    type="text"
    placeholder="${escapeText(definition.placeholder)}"${disabledAttribute}
    className="mt-2 w-full rounded-[var(--radius-${definition.radius})] ${sizeClasses} ${variantClasses} outline-none transition focus:ring-2 focus:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-60"
  />

  <span className="mt-2 block text-xs text-slate-500">
    ${escapeText(definition.helperText)}
  </span>
</label>`;
}