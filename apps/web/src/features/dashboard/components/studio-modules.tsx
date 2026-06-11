import { studioModules } from "@/features/dashboard/data/studio-home-data";

function getStatusClass(status: string): string {
  if (status.includes("Ready")) {
    return "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-900";
  }

  if (status === "Next") {
    return "bg-indigo-50 text-indigo-700 ring-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:ring-indigo-900";
  }

  return "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800";
}

export function StudioModules() {
  return (
    <section aria-labelledby="studio-modules-title">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
          Platform
        </p>
        <h2
          id="studio-modules-title"
          className="mt-1 text-xl font-black tracking-tight text-slate-950 dark:text-white"
        >
          RainbowCode studios
        </h2>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-5">
        {studioModules.map((module) => (
          <article
            key={module.name}
            className="rounded-[28px] border border-white/70 bg-white/82 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-slate-950/76"
          >
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-black ring-1 ${getStatusClass(
                module.status,
              )}`}
            >
              {module.status}
            </span>

            <h3 className="mt-5 text-base font-black text-slate-950 dark:text-white">
              {module.name}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {module.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}