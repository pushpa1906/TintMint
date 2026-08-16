import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PaletteProvider } from "./context/PaletteContext";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PaletteProvider>
      <App />
    </PaletteProvider>
  </React.StrictMode>
);
