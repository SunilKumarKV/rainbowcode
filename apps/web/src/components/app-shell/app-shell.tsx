import type { ReactNode } from "react";
import { CodePanel } from "@/components/app-shell/code-panel";
import { PropertiesPanel } from "@/components/app-shell/properties-panel";
import { Sidebar } from "@/components/app-shell/sidebar";
import { Topbar } from "@/components/app-shell/topbar";
import { rbcSurface } from "@/lib/design-system/ui-tokens";

type AppShellProps = {
  readonly children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={`min-h-screen overflow-hidden ${rbcSurface.app}`}>
      <div className="flex h-screen flex-col">
        <Topbar />

        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)]">
          <Sidebar />

          <main
            id="main-content"
            tabIndex={-1}
            className="grid min-h-0 min-w-0 grid-rows-[minmax(0,1fr)_240px] outline-none xl:grid-cols-[minmax(0,1fr)_360px] xl:grid-rows-1"
          >
            <section
              aria-label="Main studio workspace"
              className="min-h-0 min-w-0 overflow-y-auto border-t border-slate-200/70 bg-slate-100/70 p-3 dark:border-slate-800 dark:bg-slate-950/50 sm:p-4"
            >
              {children}
            </section>

            <aside
              aria-label="Studio inspector"
              className="hidden min-h-0 overflow-y-auto border-l border-slate-200/70 bg-white/80 p-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 xl:block"
            >
              <PropertiesPanel />
            </aside>

            <section
              aria-label="Mobile code preview"
              className="min-h-0 overflow-y-auto border-t border-slate-200/70 bg-slate-950 dark:border-slate-800 xl:hidden"
            >
              <CodePanel />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}