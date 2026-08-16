import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { PaletteTheme, Relationship, Roles, SavedPalette } from "../types/palette";
import { generatePalette, normalizeHex, relativeLuminance, suggestRoles } from "../utils/color";

type PaletteContextValue = {
  baseColor: string;
  setBaseColor: (value: string) => void;
  relationship: Relationship;
  setRelationship: (value: Relationship) => void;
  theme: PaletteTheme;
  setTheme: (value: PaletteTheme) => void;
  colors: string[];
  locked: boolean[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  roles: Roles;
  setRoles: React.Dispatch<React.SetStateAction<Roles>>;
  generate: () => void;
  editColor: (index: number, value: string) => void;
  toggleLock: (index: number) => void;
  addColor: (color: string) => void;
  removeColor: (index: number) => void;
  moveColor: (from: number, to: number) => void;
  reorderLightToDark: () => void;
  saved: SavedPalette[];
  savePalette: (name: string) => void;
  openPalette: (id: string) => void;
  deletePalette: (id: string) => void;
};

const PaletteContext = createContext<PaletteContextValue | null>(null);
const initial = generatePalette("#08B8B2", "Analogous", "Balanced");

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [baseColor, setBaseColor] = useState("#08B8B2");
  const [relationship, setRelationship] = useState<Relationship>("Analogous");
  const [theme, setTheme] = useState<PaletteTheme>("Balanced");
  const [colors, setColors] = useState(initial);
  const [locked, setLocked] = useState(initial.map(() => false));
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [roles, setRoles] = useState(() => suggestRoles(initial));
  const [saved, setSaved] = useState<SavedPalette[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("tintmint-palettes") ?? "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tintmint-palettes", JSON.stringify(saved));
  }, [saved]);

  const generate = () => {
    const next = generatePalette(baseColor, relationship, theme, colors.length);
    setColors((current) => current.map((color, index) => locked[index] ? color : next[index] ?? color));
  };

  const editColor = (index: number, value: string) => {
    const valid = normalizeHex(value);
    if (!valid) return;
    setColors((current) => current.map((color, i) => i === index ? valid : color));
  };

  const toggleLock = (index: number) =>
    setLocked((current) => current.map((value, i) => i === index ? !value : value));

  const addColor = (color: string) => {
    const valid = normalizeHex(color);
    if (!valid || colors.length >= 8) return;
    setColors((current) => [...current, valid]);
    setLocked((current) => [...current, false]);
  };

  const removeColor = (index: number) => {
    if (colors.length <= 3) return;
    const next = colors.filter((_, i) => i !== index);
    setColors(next);
    setLocked((current) => current.filter((_, i) => i !== index));
    setSelectedIndex(Math.min(selectedIndex, next.length - 1));
  };

  const moveColor = (from: number, to: number) => {
    if (from === to) return;

    setColors((current) => {
      const next = [...current];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });

    setLocked((current) => {
      const next = [...current];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });

    setSelectedIndex(to);
  };

  const reorderLightToDark = () => {
    const paired = colors.map((color, index) => ({ color, locked: locked[index] ?? false }));
    paired.sort((a, b) => relativeLuminance(b.color) - relativeLuminance(a.color));
    setColors(paired.map((item) => item.color));
    setLocked(paired.map((item) => item.locked));
    setSelectedIndex(0);
  };

  const savePalette = (name: string) => {
    setSaved((current) => [{
      id: crypto.randomUUID(),
      name: name.trim() || "Untitled palette",
      colors,
      relationship,
      theme,
      createdAt: new Date().toISOString()
    }, ...current]);
  };

  const openPalette = (id: string) => {
    const item = saved.find((palette) => palette.id === id);
    if (!item) return;
    setColors(item.colors);
    setLocked(item.colors.map(() => false));
    setRelationship(item.relationship);
    setTheme(item.theme);
    setBaseColor(item.colors[Math.floor(item.colors.length / 2)] ?? "#08B8B2");
    setSelectedIndex(Math.floor(item.colors.length / 2));
    setRoles(suggestRoles(item.colors));
  };

  const deletePalette = (id: string) =>
    setSaved((current) => current.filter((palette) => palette.id !== id));

  const value = useMemo(() => ({
    baseColor, setBaseColor, relationship, setRelationship, theme, setTheme,
    colors, locked, selectedIndex, setSelectedIndex, roles, setRoles,
    generate, editColor, toggleLock, addColor, removeColor, moveColor,
    reorderLightToDark, saved, savePalette, openPalette, deletePalette
  }), [baseColor, relationship, theme, colors, locked, selectedIndex, roles, saved]);

  return <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>;
}

export function usePalette() {
  const value = useContext(PaletteContext);
  if (!value) throw new Error("usePalette must be used inside PaletteProvider");
  return value;
}
