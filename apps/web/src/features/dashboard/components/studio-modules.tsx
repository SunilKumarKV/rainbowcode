import Link from "next/link";
import { studioNavItems } from "@/lib/navigation/studio-nav";

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

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {studioNavItems.map((module) => (
          <article
            key={module.href}
            className="rounded-[28px] border border-white/70 bg-white/82 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-slate-950/76"
          >
            <h3 className="mt-5 text-base font-black text-slate-950 dark:text-white">
              {module.label}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {module.description}
            </p>

            <Link
              href={module.href}
              className="mt-5 inline-flex rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              Open
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
