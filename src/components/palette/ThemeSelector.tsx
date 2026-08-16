import type { PaletteTheme } from "../../types/palette";
import { themeOptions } from "../../data/paletteOptions";
import OptionSelector from "./OptionSelector";

export default function ThemeSelector({
  value, onChange
}: { value: PaletteTheme; onChange: (value: PaletteTheme) => void }) {
  return (
    <OptionSelector
      legend="Theme"
      description="Choose how light, strong or muted you want the palette to feel."
      options={themeOptions}
      value={value}
      onChange={onChange}
    />
  );
}
