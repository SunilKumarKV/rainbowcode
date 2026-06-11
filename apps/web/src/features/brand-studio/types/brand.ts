export type BrandPaletteColor = {
  readonly id: string;
  readonly name: string;
  readonly value: string;
};

export type BrandKit = {
  readonly name: string;
  readonly slogan: string;
  readonly logoText: string;
  readonly palette: readonly BrandPaletteColor[];
};