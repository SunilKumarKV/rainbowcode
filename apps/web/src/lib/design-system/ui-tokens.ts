export const rbcFocusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-slate-600 dark:focus-visible:ring-offset-slate-950";

export const rbcSurface = {
  app: "bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.16),transparent_32%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_48%,#f8fafc_100%)] text-slate-950 dark:bg-[radial-gradient(circle_at_top_left,rgba(129,140,248,0.14),transparent_34%),linear-gradient(180deg,#020617_0%,#0f172a_48%,#020617_100%)] dark:text-white",
  card: "border border-white/70 bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/78 dark:shadow-[0_24px_80px_rgba(0,0,0,0.28)]",
  panel:
    "border border-slate-200/80 bg-white/88 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/88",
} as const;

export const rbcText = {
  eyebrow:
    "text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300",
  title: "text-xl font-semibold tracking-tight text-slate-950 dark:text-white",
  body: "text-sm leading-6 text-slate-600 dark:text-slate-400",
  muted: "text-xs leading-5 text-slate-500 dark:text-slate-500",
} as const;

export const rbcButton = {
  base: `inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${rbcFocusRing}`,
  primary:
    "bg-slate-950 text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900",
  ghost:
    "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white",
  danger:
    "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-900 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900",
} as const;

export const rbcBadge = {
  base: "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
  neutral: "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
  success:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  warning:
    "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  info: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
} as const;