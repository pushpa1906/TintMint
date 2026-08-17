import { useState } from "react";

function fallbackCopy(text: string) {
  const textarea = document.createElement("textarea");

  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";

  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, text.length);

  const copied = document.execCommand("copy");

  document.body.removeChild(textarea);

  return copied;
}

export function useClipboard() {
  const [message, setMessage] = useState("");

  const copy = async (text: string, label = "value") => {
    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const copied = fallbackCopy(text);

        if (!copied) {
          throw new Error("Clipboard copy failed");
        }
      }

      setMessage(`Copied ${label}`);
    } catch {
      setMessage("Could not copy. Please select the text and copy it manually.");
    }

    window.setTimeout(() => setMessage(""), 1800);
  };

  return { copy, message };
}