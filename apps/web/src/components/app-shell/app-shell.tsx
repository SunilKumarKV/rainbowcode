import type { ReactNode } from "react";
import { PropertiesPanel } from "@/components/app-shell/properties-panel";
import { Sidebar } from "@/components/app-shell/sidebar";
import { Topbar } from "@/components/app-shell/topbar";
import { rbcSurface } from "@/lib/design-system/ui-tokens";

type AppShellProps = {
  readonly children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={`min-h-screen ${rbcSurface.app}`}>
      <div className="flex min-h-screen flex-col">
        <Topbar />

        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[312px_minmax(0,1fr)] xl:grid-cols-[312px_minmax(0,1fr)_372px]">
          <Sidebar />

          <main
            id="main-content"
            tabIndex={-1}
            className="min-w-0 outline-none"
          >
            {children}
          </main>

          <aside
            aria-label="Right inspector"
            className="hidden min-h-0 border-l border-slate-200/80 bg-white/80 p-3 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/82 xl:block"
          >
            <PropertiesPanel />
          </aside>
        </div>
      </div>
    </div>
  );
}