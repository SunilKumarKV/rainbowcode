import { recentProjects } from "@/features/dashboard/data/studio-home-data";

export function RecentProjects() {
  return (
    <section aria-labelledby="recent-projects-title">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
            Projects
          </p>
          <h2
            id="recent-projects-title"
            className="mt-1 text-xl font-black tracking-tight text-slate-950 dark:text-white"
          >
            Recent work
          </h2>
        </div>

        <button
          type="button"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-600 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
        >
          View all
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {recentProjects.map((project) => (
          <article
            key={project.name}
            className="group overflow-hidden rounded-[28px] border border-white/70 bg-white/82 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-slate-950/76"
          >
            <div className={`h-24 bg-gradient-to-br ${project.accent}`} />

            <div className="p-4">
              <p className="text-xs font-bold text-slate-500">
                {project.type}
              </p>

              <h3 className="mt-1 truncate text-base font-black text-slate-950 dark:text-white">
                {project.name}
              </h3>

              <p className="mt-3 text-xs text-slate-500">
                {project.updatedAt}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}