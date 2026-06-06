"use client";

export function PropertiesPanel() {
  return (
    <aside
      aria-label="Properties panel"
      className="hidden w-80 border-l border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950 lg:block"
    >
      <h2 className="text-sm font-semibold text-slate-950 dark:text-white">
        Properties
      </h2>

      <div className="mt-4 space-y-4">
        <div>
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
            className="mt-1 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div>
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
            className="mt-2 w-full"
          />
        </div>
      </div>
    </aside>
  );
}