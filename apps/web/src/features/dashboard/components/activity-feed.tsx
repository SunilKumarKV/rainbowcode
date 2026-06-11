import { activityItems } from "@/features/dashboard/data/studio-home-data";

export function ActivityFeed() {
  return (
    <section
      aria-labelledby="activity-title"
      className="rounded-[28px] border border-white/70 bg-white/82 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/76"
    >
      <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
        Activity
      </p>

      <h2
        id="activity-title"
        className="mt-1 text-xl font-black tracking-tight text-slate-950 dark:text-white"
      >
        Latest studio updates
      </h2>

      <div className="mt-5 space-y-3">
        {activityItems.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/70"
          >
            <span className="size-2 rounded-full bg-indigo-500" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}