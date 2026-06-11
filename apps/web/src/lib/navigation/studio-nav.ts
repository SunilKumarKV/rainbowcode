export type StudioNavItem = {
  readonly label: string;
  readonly href: string;
  readonly description: string;
};

export const studioNavItems: readonly StudioNavItem[] = [
  {
  label: "Brand Studio",
  href: "/studio",
  description: "Create brand kits, logo direction, colors, and typography.",
},
  {
    label: "Theme Studio",
    href: "/studio/theme",
    description: "Design glass, neon, SaaS, luxury, and custom themes.",
  },
  {
    label: "Component Studio",
    href: "/studio/components",
    description: "Build buttons, cards, inputs, navbars, and UI systems.",
  },
  {
    label: "Canvas Studio",
    href: "/studio/canvas",
    description: "Draw, drag, resize, and visually compose layouts.",
  },
  {
    label: "Code Studio",
    href: "/studio/code",
    description: "Preview and export React, Next.js, and Tailwind code.",
  },
] as const;