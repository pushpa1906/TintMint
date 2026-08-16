import type { Relationship } from "../../types/palette";
import { relationshipOptions } from "../../data/paletteOptions";
import OptionSelector from "./OptionSelector";

export default function RelationshipSelector({
  value, onChange
}: { value: Relationship; onChange: (value: Relationship) => void }) {
  return (
    <OptionSelector
      legend="Relationship"
      description="Choose how the generated colors relate to your starting color."
      options={relationshipOptions}
      value={value}
      onChange={onChange}
    />
  );
}
