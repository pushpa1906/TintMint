import { useState } from "react";
import { normalizeHex } from "../../utils/color";
import Button from "../common/Button";
import ColorInput from "./ColorInput";

export default function AddColor({
  onAdd, disabled = false
}: { onAdd: (color: string) => void; disabled?: boolean }) {
  const [value, setValue] = useState("#E26D5A");
  const valid = normalizeHex(value);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <ColorInput label="New color" value={value} onChange={setValue} fallback="#E26D5A" size="sm" />
      <Button
        variant="secondary"
        size="sm"
        disabled={disabled || !valid}
        onClick={() => valid && onAdd(valid)}
      >
        + Add color
      </Button>
    </div>
  );
}
