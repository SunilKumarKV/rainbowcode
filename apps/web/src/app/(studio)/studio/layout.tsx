import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell/app-shell";

type StudioLayoutProps = {
  readonly children: ReactNode;
};

export default function StudioLayout({ children }: StudioLayoutProps) {
  return <AppShell>{children}</AppShell>;
}