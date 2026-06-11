import type { ActiveStudio } from "@/stores/app-shell-store";

export type StudioNavItem = {
  readonly studio: ActiveStudio | "overview";
  readonly label: string;
  readonly href: string;
  readonly description: string;
};

export const studioNavItems: readonly StudioNavItem[] = [
  {
    studio: "overview",
    label: "Overview",
    href: "/studio",
    description: "See current workspace state, exports, and studio entry points.",
  },
  {
    studio: "brand",
    label: "Brand Studio",
    href: "/studio/brand",
    description: "Create brand kits, logo direction, colors, and typography.",
  },
  {
    studio: "theme",
    label: "Theme Studio",
    href: "/studio/theme",
    description: "Design production theme tokens and export CSS, JSON, and Tailwind.",
  },
  {
    studio: "components",
    label: "Component Studio",
    href: "/studio/components",
    description: "Build buttons, cards, inputs, badges, and reusable UI systems.",
  },
  {
    studio: "canvas",
    label: "Canvas Studio",
    href: "/studio/canvas",
    description: "Draw, drag, resize, and visually compose layouts.",
  },
  {
    studio: "code",
    label: "Code Studio",
    href: "/studio/code",
    description: "Review current code output and export-ready artifacts.",
  },
] as const;
