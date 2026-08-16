import { useState } from "react";

export function useClipboard() {
  const [message, setMessage] = useState("");

  const copy = async (text: string, label = "value") => {
    await navigator.clipboard.writeText(text);
    setMessage(`Copied ${label}`);
    window.setTimeout(() => setMessage(""), 1400);
  };

  return { copy, message };
}
