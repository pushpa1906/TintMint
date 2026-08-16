import { useMemo } from "react";
import { Sparkles } from "lucide-react";
import type { PaletteTheme, Relationship } from "../../types/palette";
import { relationshipOptions, themeOptions } from "../../data/paletteOptions";
import { generatePalette } from "../../utils/color";
import Card from "../common/Card";
import ColorSwatch from "./ColorSwatch";
import ColorWheel from "./ColorWheel";

interface RelationshipPreviewProps {
  baseColor: string;
  relationship: Relationship;
  theme: PaletteTheme;
  previewCount?: number;
}

/**
 * Live sidebar preview for the Create page. Shows a color-wheel "picture" of
 * the current relationship plus the resulting swatches and explanation text,
 * updating instantly as the person changes the starting color, relationship
 * or theme — no need to click Generate first.
 */
export default function RelationshipPreview({
  baseColor,
  relationship,
  theme,
  previewCount = 5,
}: RelationshipPreviewProps) {
  const previewColors = useMemo(
    () => generatePalette(baseColor, relationship, theme, previewCount),
    [baseColor, relationship, theme, previewCount]
  );

  const relationshipInfo = relationshipOptions.find((option) => option.name === relationship) ?? relationshipOptions[0];
  const themeInfo = themeOptions.find((option) => option.name === theme) ?? themeOptions[0];

  return (
    <Card padding="lg" className="flex flex-col items-center gap-6 text-center">
      <div className="flex items-center gap-2 text-muted dark:text-muted-dark">
        <Sparkles className="h-4 w-4 color-yellow" aria-hidden="true" />
        <p className="text-sm font-semibold uppercase tracking-wide">Live preview</p>
      </div>

      <ColorWheel colors={previewColors} size={300} />

      <div className="flex flex-wrap justify-center gap-2">
        {previewColors.map((color, index) => (
          <ColorSwatch key={`${color}-${index}`} color={color} size="md" />
        ))}
      </div>

      <div className="w-full space-y-4 border-t border-line pt-4 text-left dark:border-line-dark">
        <div>
          <p className="text-base font-semibold text-ink dark:text-ink-dark">{relationshipInfo.name}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted dark:text-muted-dark">{relationshipInfo.meaning}</p>
        </div>
        <div className="border-t border-line pt-4 dark:border-line-dark">
          <p className="text-base font-semibold text-ink dark:text-ink-dark">{themeInfo.name} theme</p>
          <p className="mt-1 text-sm leading-relaxed text-muted dark:text-muted-dark">{themeInfo.meaning}</p>
        </div>
      </div>
    </Card>
  );
}
