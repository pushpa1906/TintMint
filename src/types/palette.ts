export type Relationship =
  | "Complementary"
  | "Analogous"
  | "Monochromatic"
  | "Triadic"
  | "Split Complementary"
  | "Tetradic";

export type PaletteTheme =
  | "Balanced"
  | "Soft"
  | "Bold"
  | "Pastel"
  | "Deep"
  | "Muted";

export type RoleKey =
  | "primary"
  | "secondary"
  | "background"
  | "surface"
  | "text"
  | "mutedText"
  | "border";

export type Roles = Record<RoleKey, string>;

export type SavedPalette = {
  id: string;
  name: string;
  colors: string[];
  relationship: Relationship;
  theme: PaletteTheme;
  createdAt: string;
};
