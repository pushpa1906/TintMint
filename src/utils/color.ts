import type { PaletteTheme, Relationship, Roles } from "../types/palette";

export const normalizeHex = (value: string): string | null => {
  let hex = value.trim().replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  return /^[0-9a-fA-F]{6}$/.test(hex) ? `#${hex.toUpperCase()}` : null;
};

export const hexToRgb = (hex: string) => {
  const valid = normalizeHex(hex) ?? "#000000";
  const value = parseInt(valid.slice(1), 16);
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
};

export const rgbToHex = (r: number, g: number, b: number) =>
  "#" +
  [r, g, b]
    .map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

export const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  const d = max - min;

  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === r) h = 60 * (((g - b) / d) % 6);
    else if (max === g) h = 60 * ((b - r) / d + 2);
    else h = 60 * ((r - g) / d + 4);
  }

  return { h: (h + 360) % 360, s: s * 100, l: l * 100 };
};

export const hexToHsl = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHsl(r, g, b);
};

export const hslToHex = (h: number, s: number, l: number) => {
  h = ((h % 360) + 360) % 360;
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let rp = 0, gp = 0, bp = 0;
  if (h < 60) [rp, gp, bp] = [c, x, 0];
  else if (h < 120) [rp, gp, bp] = [x, c, 0];
  else if (h < 180) [rp, gp, bp] = [0, c, x];
  else if (h < 240) [rp, gp, bp] = [0, x, c];
  else if (h < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];

  return rgbToHex((rp + m) * 255, (gp + m) * 255, (bp + m) * 255);
};

const relationshipOffsets: Record<Relationship, number[]> = {
  Complementary: [0, 180, 0, 180, 0],
  Analogous: [-60, -30, 0, 30, 60],
  Monochromatic: [0, 0, 0, 0, 0],
  Triadic: [0, 120, 240, 120, 240],
  "Split Complementary": [0, 150, 210, 150, 210],
  Tetradic: [0, 60, 180, 240, 0]
};

const themeAdjust = (s: number, l: number, theme: PaletteTheme, index: number) => {
  const spread = [-18, -8, 0, 8, 18][index] ?? 0;
  switch (theme) {
    case "Soft":
      return { s: Math.min(s, 52), l: Math.max(30, Math.min(88, l + spread * 0.55 + 8)) };
    case "Bold":
      return { s: Math.max(72, s), l: Math.max(28, Math.min(72, l + spread * 0.5)) };
    case "Pastel":
      return { s: Math.min(68, Math.max(35, s)), l: Math.max(68, Math.min(92, 82 + spread * 0.35)) };
    case "Deep":
      return { s: Math.max(50, s), l: Math.max(16, Math.min(52, 34 + spread * 0.45)) };
    case "Muted":
      return { s: Math.min(38, s), l: Math.max(26, Math.min(78, l + spread * 0.55)) };
    default:
      return { s, l: Math.max(20, Math.min(86, l + spread)) };
  }
};

export const generatePalette = (
  baseHex: string,
  relationship: Relationship,
  theme: PaletteTheme,
  count = 5
) => {
  const base = normalizeHex(baseHex) ?? "#08B8B2";
  const { h, s, l } = hexToHsl(base);
  const offsets = relationshipOffsets[relationship];
  const monoLightness = [88, 70, Math.max(42, Math.min(58, l)), 34, 20];

  return Array.from({ length: count }, (_, index) => {
    const themed = themeAdjust(
      s,
      relationship === "Monochromatic" ? monoLightness[index] : l,
      theme,
      index
    );
    return hslToHex(h + offsets[index % offsets.length], themed.s, themed.l);
  });
};

export const generateShades = (hex: string) => {
  const { h, s } = hexToHsl(hex);
  return [96, 91, 84, 74, 64, 54, 44, 34, 24, 14].map((l) => hslToHex(h, s, l));
};

export const mixColors = (a: string, b: string, percentB: number) => {
  const A = hexToRgb(a), B = hexToRgb(b), t = percentB / 100;
  return rgbToHex(
    A.r * (1 - t) + B.r * t,
    A.g * (1 - t) + B.g * t,
    A.b * (1 - t) + B.b * t
  );
};

export const relativeLuminance = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const channel = (value: number) => {
    const x = value / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

export const readableText = (hex: string) =>
  relativeLuminance(hex) > 0.46 ? "#222222" : "#FFFFFF";

export const suggestRoles = (colors: string[]): Roles => {
  const clean = colors.map((c) => normalizeHex(c) ?? "#808080");
  const sorted = [...clean].sort((a, b) => relativeLuminance(b) - relativeLuminance(a));
  const lightest = sorted[0];
  const darkest = sorted[sorted.length - 1];
  const middle = clean[Math.floor(clean.length / 2)] ?? clean[0];
  const secondary = clean[Math.min(clean.length - 1, Math.floor(clean.length / 2) + 1)] ?? middle;

  return {
    primary: middle,
    secondary,
    background: lightest,
    surface: mixColors(lightest, "#FFFFFF", 55),
    text: darkest,
    mutedText: mixColors(darkest, lightest, 38),
    border: mixColors(darkest, lightest, 76)
  };
};
