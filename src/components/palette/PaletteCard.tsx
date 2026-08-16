import Button from "../common/Button";
import Card from "../common/Card";
import PaletteStrip from "./PaletteStrip";
import type { SavedPalette } from "../../types/palette";

interface PaletteCardProps {
  palette: SavedPalette;
  onOpen: () => void;
  onDelete: () => void;
}

/** A single saved palette: name, metadata, actions and a color preview. */
export default function PaletteCard({ palette, onOpen, onDelete }: PaletteCardProps) {
  return (
    <Card padding="md" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-ink dark:text-ink-dark">{palette.name}</h2>
          <p className="mt-0.5 text-sm text-muted dark:text-muted-dark">
            {palette.relationship} · {palette.theme}
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" onClick={onOpen}>
            Open
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
      <PaletteStrip colors={palette.colors} locked={palette.colors.map(() => false)} compact />
    </Card>
  );
}
