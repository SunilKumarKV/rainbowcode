export const recentProjects = [
  {
    name: "SaaS Brand System",
    type: "Brand Kit",
    updatedAt: "Updated 2 min ago",
    accent: "from-indigo-500 to-cyan-400",
  },
  {
    name: "AI Landing Page",
    type: "Canvas",
    updatedAt: "Updated today",
    accent: "from-fuchsia-500 to-indigo-500",
  },
  {
    name: "Dashboard UI Kit",
    type: "Components",
    updatedAt: "Updated yesterday",
    accent: "from-emerald-500 to-cyan-400",
  },
  {
    name: "Neon Theme Pack",
    type: "Theme",
    updatedAt: "Updated 3 days ago",
    accent: "from-purple-500 to-pink-500",
  },
] as const;

export const studioModules = [
  {
    name: "Brand Studio",
    status: "Next",
    description: "Logo direction, typography, palettes, and brand kits.",
  },
  {
    name: "Theme Studio",
    status: "Ready",
    description: "Token-powered themes for modern product interfaces.",
  },
  {
    name: "Component Studio",
    status: "Ready",
    description: "Buttons, cards, inputs, badges, and reusable UI primitives.",
  },
  {
    name: "Canvas Studio",
    status: "V1 Ready",
    description: "Visual layout builder with exportable React/Tailwind code.",
  },
  {
    name: "Code Studio",
    status: "Preview",
    description: "Generated TSX, JSON, Tailwind tokens, and future RBC CLI.",
  },
] as const;

export const activityItems = [
  "Exported rainbow-canvas.tsx",
  "Updated global theme tokens",
  "Created default RainbowCode brand kit",
  "Generated component bundle",
] as const;

export const quickActions = [
  "Create Brand Kit",
  "Open Canvas Studio",
  "Import JSON",
  "Export Code",
] as const;