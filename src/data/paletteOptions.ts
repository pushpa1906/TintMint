import type { PaletteTheme, Relationship } from "../types/palette";

export interface PaletteOption<T extends string> {
  name: T;
  meaning: string;
}

/**
 * Single source of truth for relationship copy. Used by RelationshipSelector
 * (the picker) and RelationshipPreview (the live sidebar preview) so the
 * explanation text never drifts between the two places it appears.
 */
export const relationshipOptions: PaletteOption<Relationship>[] = [
  { name: "Complementary", meaning: "Uses colors opposite each other on the color wheel. Good when you want clear, strong contrast." },
  { name: "Analogous", meaning: "Uses neighboring colors on the color wheel. Good for a smooth, connected palette." },
  { name: "Monochromatic", meaning: "Uses lighter and darker versions of one hue. Good for a consistent, unified look." },
  { name: "Triadic", meaning: "Uses three hue families spaced evenly around the color wheel. Colorful, but still balanced." },
  { name: "Split Complementary", meaning: "Uses your starting color plus two colors beside its opposite. Contrasting, but softer than complementary." },
  { name: "Tetradic", meaning: "Uses two complementary color pairs. Useful when you want a broader, more varied palette." }
];

/** Single source of truth for theme copy — see relationshipOptions above. */
export const themeOptions: PaletteOption<PaletteTheme>[] = [
  { name: "Balanced", meaning: "Keeps a natural mix of saturation and brightness. A good general starting point." },
  { name: "Soft", meaning: "Uses gentler saturation and contrast. Good for calm, subtle interfaces." },
  { name: "Bold", meaning: "Uses stronger saturation and contrast when the palette needs more visual impact." },
  { name: "Pastel", meaning: "Makes colors lighter and softer for a light, airy feeling." },
  { name: "Deep", meaning: "Makes colors darker and richer for a stronger, grounded feeling." },
  { name: "Muted", meaning: "Reduces saturation to create quieter, less intense colors." }
];
