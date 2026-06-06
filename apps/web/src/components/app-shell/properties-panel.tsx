"use client";

export function PropertiesPanel() {
  return (
    <aside
      aria-label="Properties panel"
      className="hidden w-80 shrink-0 border-l border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 xl:block"
    >
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Inspector
        </p>
        <h2 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">
          Properties
        </h2>
      </div>

      <div className="space-y-4">
        <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
            Element
          </h3>

          <div className="mt-4">
            <label
              htmlFor="element-name"
              className="text-xs font-medium text-slate-600 dark:text-slate-400"
            >
              Element name
            </label>
            <input
              id="element-name"
              type="text"
              defaultValue="Primary Button"
              className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none focus:bg-white focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
            Appearance
          </h3>

          <div className="mt-4">
            <label
              htmlFor="radius"
              className="text-xs font-medium text-slate-600 dark:text-slate-400"
            >
              Radius
            </label>
            <input
              id="radius"
              type="range"
              min="0"
              max="32"
              defaultValue="12"
              className="mt-2 w-full accent-slate-950 dark:accent-white"
            />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {["#0f172a", "#2563eb", "#16a34a", "#9333ea"].map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`Select color ${color}`}
                className="size-9 rounded-xl border border-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}