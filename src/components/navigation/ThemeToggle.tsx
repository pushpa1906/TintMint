import { Moon, Sun } from "lucide-react";
import IconButton from "../common/IconButton";

interface ThemeToggleProps {
  dark: boolean;
  onToggle: () => void;
}

/**
 * A simple icon-only light/dark switch. Shows a moon in light mode
 * (click to go dark) and a sun in dark mode (click to go light).
 */
export default function ThemeToggle({ dark, onToggle }: ThemeToggleProps) {
  return (
    <IconButton label={dark ? "Switch to light theme" : "Switch to dark theme"} onClick={onToggle}>
      {dark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
    </IconButton>
  );
}
