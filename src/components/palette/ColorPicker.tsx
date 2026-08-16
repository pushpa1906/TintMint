import ColorInput from "./ColorInput";

export default function ColorPicker({
  value, onChange
}: { value: string; onChange: (value: string) => void }) {
  return <ColorInput label="Starting color" value={value} onChange={onChange} />;
}
