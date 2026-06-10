import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcPanel } from "@/components/ui/rbc-panel";
import { ComponentStudioPanel } from "@/features/component-studio/components/component-studio-panel";
import { ThemeStudioPanel } from "@/features/theme-studio/components/theme-studio-panel";

export function PropertiesPanel() {
  return (
    <aside aria-label="Properties and controls" className="space-y-4">
      <RbcPanel eyebrow="Properties" title="Studio Controls">
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
          Tune tokens, components, and canvas output from one consistent control
          surface.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <RbcBadge variant="success">Theme</RbcBadge>
          <RbcBadge variant="success">Components</RbcBadge>
          <RbcBadge variant="info">Canvas</RbcBadge>
        </div>
      </RbcPanel>

      <ThemeStudioPanel />
      <ComponentStudioPanel />
    </aside>
  );
}