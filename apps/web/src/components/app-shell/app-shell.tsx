"use client";

import type { ReactNode } from "react";
import { CodePanel } from "@/components/app-shell/code-panel";
import { PropertiesPanel } from "@/components/app-shell/properties-panel";
import { Sidebar } from "@/components/app-shell/sidebar";
import { Topbar } from "@/components/app-shell/topbar";
import { Workspace } from "@/components/app-shell/workspace";
import { ThemeProvider } from "@/features/theme-engine/runtime/theme-provider";

type AppShellProps = {
  readonly children?: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-white">
        <Topbar />

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <Sidebar />

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="min-h-0 flex flex-1 overflow-hidden">
              <div className="min-w-0 flex-1 overflow-auto">
                {children ?? <Workspace />}
              </div>
              <PropertiesPanel />
            </div>

            <CodePanel />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}