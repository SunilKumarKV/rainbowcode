"use client";

import type { ReactNode } from "react";
import { Topbar } from "@/components/app-shell/topbar";
import { Sidebar } from "@/components/app-shell/sidebar";
import { Workspace } from "@/components/app-shell/workspace";
import { PropertiesPanel } from "@/components/app-shell/properties-panel";
import { CodePanel } from "@/components/app-shell/code-panel";

type AppShellProps = {
  readonly children?: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <Topbar />

      <div className="flex min-h-0 flex-1">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          {children ?? <Workspace />}
          <CodePanel />
        </div>

        <PropertiesPanel />
      </div>
    </div>
  );
}