import { Workspace } from "@/components/app-shell/workspace";
import { StudioHome } from "@/features/dashboard/components/studio-home";

export default function StudioPage() {
  return (
    <div className="space-y-8">
      <StudioHome />
      <Workspace />
    </div>
  );
}