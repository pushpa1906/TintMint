import { useEffect, useState } from "react";

export function useAppearance() {
  const [dark, setDark] = useState(() => localStorage.getItem("tintmint-appearance") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("tintmint-appearance", dark ? "dark" : "light");
  }, [dark]);

  return { dark, setDark };
}
