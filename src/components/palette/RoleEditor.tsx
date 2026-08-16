import type { RoleKey, Roles } from "../../types/palette";
import Select from "../common/Select";
import ColorSwatch from "./ColorSwatch";

const items: { key: RoleKey; label: string; description: string }[] = [
  { key: "primary", label: "Primary", description: "Main actions and important links." },
  { key: "secondary", label: "Secondary", description: "Supporting actions and highlights." },
  { key: "background", label: "Background", description: "Largest page area." },
  { key: "surface", label: "Surface", description: "Content panels and fields." },
  { key: "text", label: "Text", description: "Main readable content." },
  { key: "mutedText", label: "Muted text", description: "Supporting copy." },
  { key: "border", label: "Border", description: "Dividers and field outlines." }
];

export default function RoleEditor({
  roles, colors, onChange
}: {
  roles: Roles;
  colors: string[];
  onChange: (key: RoleKey, value: string) => void;
}) {
  return (
    <div className="mt-4 divide-y divide-line border-y border-line dark:divide-line-dark dark:border-line-dark">
      {items.map((item) => (
        <div
          key={item.key}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            const color = event.dataTransfer.getData("text/tintmint-color");
            if (color) onChange(item.key, color);
          }}
          className="grid gap-3 py-4 sm:grid-cols-[1fr_auto] sm:items-center"
        >
          <div>
            <p className="text-base font-semibold text-ink dark:text-ink-dark">{item.label}</p>
            <p className="text-sm text-muted dark:text-muted-dark">{item.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <ColorSwatch color={roles[item.key]} label={`${item.label}: ${roles[item.key]}`} />
            <Select
              label={`Change ${item.label}`}
              hideLabel
              value={roles[item.key]}
              onChange={(event) => onChange(item.key, event.target.value)}
              className="w-36 font-mono text-sm"
            >
              {colors.map((color) => <option key={color} value={color}>{color}</option>)}
            </Select>
          </div>
        </div>
      ))}
    </div>
  );
}
