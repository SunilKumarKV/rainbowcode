export const rbcFocusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-950";

export const rbcSurface = {
  app: "bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.22),transparent_32rem),radial-gradient(circle_at_top_right,rgba(217,70,239,0.16),transparent_28rem),linear-gradient(180deg,#f8fafc_0%,#eef2ff_48%,#f8fafc_100%)] text-slate-950 dark:bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_30rem),radial-gradient(circle_at_top_right,rgba(217,70,239,0.12),transparent_28rem),linear-gradient(180deg,#020617_0%,#0f172a_48%,#020617_100%)] dark:text-white",
  card: "border border-white/70 bg-white/78 shadow-[0_24px_90px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/76 dark:shadow-[0_24px_90px_rgba(0,0,0,0.32)]",
  panel:
    "border border-slate-200/80 bg-white/84 shadow-[0_16px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/84",
  editor:
    "border border-white/10 bg-slate-950 shadow-[0_34px_120px_rgba(15,23,42,0.24)]",
} as const;

export const rbcText = {
  eyebrow:
    "text-xs font-black uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300",
  title:
    "text-2xl font-black tracking-[-0.04em] text-slate-950 dark:text-white",
  hero: "text-5xl font-black tracking-[-0.065em] text-slate-950 dark:text-white sm:text-7xl",
  body: "text-sm leading-6 text-slate-600 dark:text-slate-400",
  muted: "text-xs leading-5 text-slate-500 dark:text-slate-500",
} as const;

export const rbcButton = {
  base: `inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2 text-sm font-bold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${rbcFocusRing}`,
  primary:
    "bg-slate-950 text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200",
  secondary:
    "border border-slate-200 bg-white/88 text-slate-700 shadow-sm hover:-translate-y-0.5 hover:bg-white dark:border-slate-800 dark:bg-slate-950/88 dark:text-slate-200 dark:hover:bg-slate-900",
  ghost:
    "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white",
  danger:
    "border border-red-200 bg-red-50 text-red-700 hover:-translate-y-0.5 hover:bg-red-100 dark:border-red-900 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900",
} as const;

export const rbcBadge = {
  base: "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-black",
  neutral:
    "bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800",
  success:
    "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-900",
  warning:
    "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-900",
  info: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:ring-indigo-900",
} as const;

export const rbcField =
  "h-11 rounded-2xl border border-slate-200 bg-white/88 px-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950/88 dark:text-white dark:focus:border-indigo-700";

export const rbcPanelHeader =
  "border-b border-slate-200/70 px-4 py-4 dark:border-slate-800";

export const rbcPremiumCard =
  "rounded-[28px] border border-white/70 bg-white/78 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/76";