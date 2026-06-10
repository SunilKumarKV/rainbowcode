import type { ReactNode } from "react";
import { CodePanel } from "@/components/app-shell/code-panel";
import { PropertiesPanel } from "@/components/app-shell/properties-panel";
import { Sidebar } from "@/components/app-shell/sidebar";
import { Topbar } from "@/components/app-shell/topbar";
import { Workspace } from "@/components/app-shell/workspace";
import { rbcSurface } from "@/lib/design-system/ui-tokens";

type AppShellProps = {
  readonly children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={`min-h-screen ${rbcSurface.app}`}>
      <div className="mx-auto flex min-h-screen w-full max-w-[1800px] flex-col px-3 py-3 sm:px-4 lg:px-6">
        <Topbar />

        <div className="mt-4 grid min-h-[calc(100vh-104px)] gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <Sidebar />

          <main className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
            <section className="min-w-0 space-y-4">
              <Workspace />
              {children}
              <CodePanel />
            </section>

            <PropertiesPanel />
          </main>
        </div>
      </div>
    </div>
  );
}