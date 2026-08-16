import { hexToHsl } from "../../utils/color";

interface ColorWheelProps {
  /** Hex colors to plot on the wheel, positioned by hue. */
  colors: string[];
  size?: number;
}

const WHEEL_GRADIENT =
  "conic-gradient(from 0deg, hsl(0 80% 55%), hsl(60 80% 55%), hsl(120 70% 45%), hsl(180 70% 45%), hsl(240 75% 55%), hsl(300 75% 55%), hsl(360 80% 55%))";

/**
 * A small "picture" of the current palette: a hue wheel with a dot for each
 * color, positioned at that color's hue angle. Gives an at-a-glance sense of
 * a relationship (e.g. complementary colors land opposite each other).
 */
export default function ColorWheel({ colors, size = 200 }: ColorWheelProps) {
  const radius = size / 2;
  const markerOrbit = radius - 16;

  return (
    <div
      role="img"
      aria-label={`Color wheel showing the hue of ${colors.length} palette colors`}
      className="relative shrink-0 rounded-full shadow-inner"
      style={{ width: size, height: size, background: WHEEL_GRADIENT }}
    >
      <span
        className="absolute rounded-full bg-canvas dark:bg-canvas-dark"
        style={{ inset: radius * 0.32 }}
        aria-hidden="true"
      />

      {colors.map((color, index) => {
        const { h } = hexToHsl(color);
        const angle = ((h - 90) * Math.PI) / 180;
        const x = radius + markerOrbit * Math.cos(angle);
        const y = radius + markerOrbit * Math.sin(angle);

        return (
          <span
            key={`${color}-${index}`}
            aria-hidden="true"
            className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm dark:border-canvas-dark"
            style={{ left: x, top: y, backgroundColor: color }}
          />
        );
      })}
    </div>
  );
}
