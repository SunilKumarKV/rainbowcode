export const rbcFocusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-focus-ring-offset)]";

export const rbcSurface = {
  app: "bg-transparent text-[var(--surface-foreground)]",
  card: "rbc-surface-card",
  panel: "rbc-surface-panel",
  editor: "rbc-surface-editor",
} as const;

export const rbcText = {
  eyebrow:
    "text-xs font-black uppercase tracking-[0.22em] text-[var(--color-primary)]",
  title:
    "text-2xl font-black tracking-[-0.04em] text-[var(--surface-foreground)]",
  hero: "text-5xl font-black tracking-[-0.065em] text-[var(--surface-foreground)] sm:text-7xl",
  body: "text-sm leading-6 text-[var(--theme-text-muted)]",
  muted: "text-xs leading-5 text-[var(--theme-text-subtle)]",
} as const;

export const rbcButton = {
  base: `inline-flex min-h-10 items-center justify-center rounded-[var(--radius-md)] px-4 py-2 text-sm font-bold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${rbcFocusRing}`,
  primary:
    "border border-transparent bg-[var(--color-primary)] text-[var(--surface-on-primary)] shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:brightness-105",
  secondary:
    "border border-[var(--theme-border-soft)] bg-[var(--surface-panel-strong)] text-[var(--surface-foreground)] shadow-sm hover:-translate-y-0.5 hover:bg-[var(--surface-card-strong)]",
  ghost:
    "text-[var(--theme-text-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--surface-foreground)]",
  danger:
    "border border-[var(--color-destructive)] bg-[var(--surface-danger-soft)] text-[var(--color-destructive)] hover:-translate-y-0.5 hover:brightness-105",
} as const;

export const rbcBadge = {
  base: "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-black",
  neutral:
    "bg-[var(--surface-muted)] text-[var(--surface-foreground)] ring-1 ring-[var(--theme-border-soft)]",
  success:
    "bg-[var(--surface-success-soft)] text-[var(--color-success)] ring-1 ring-[var(--surface-success-soft)]",
  warning:
    "bg-[var(--surface-warning-soft)] text-[var(--color-warning)] ring-1 ring-[var(--surface-warning-soft)]",
  info: "bg-[var(--surface-accent-soft)] text-[var(--color-primary)] ring-1 ring-[var(--surface-accent-soft)]",
} as const;

export const rbcField =
  `rbc-field h-11 rounded-[var(--radius-md)] px-3 text-sm font-semibold outline-none transition ${rbcFocusRing}`;

export const rbcPanelHeader =
  "border-b border-[var(--theme-border-soft)] px-4 py-4";

export const rbcPremiumCard =
  "rounded-[28px] rbc-surface-card";
