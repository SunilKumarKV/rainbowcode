import type { BrandKit } from "@/features/brand-studio/types/brand";

export function exportBrandJson(brand: BrandKit): string {
  return JSON.stringify(
    {
      $schema: "https://rainbowcode.dev/schemas/brand-kit.json",
      brand,
    },
    null,
    2,
  );
}