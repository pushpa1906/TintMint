import { useEffect, useState } from "react";
import Navbar, { type Page } from "./components/navigation/Navbar";
import CreatePage from "./pages/CreatePage";
import MixPage from "./pages/MixPage";
import PreviewPage from "./pages/PreviewPage";
import SavedPage from "./pages/SavedPage";
import ExportPage from "./pages/ExportPage";
import { useAppearance } from "./hooks/useAppearance";

const validPages: Page[] = ["create","mix","preview","saved","export"];

export default function App() {
  const readHash = (): Page => {
    const value = window.location.hash.replace("#/", "") as Page;
    return validPages.includes(value) ? value : "create";
  };

  const [page, setPage] = useState<Page>(readHash);
  const { dark, setDark } = useAppearance();

  useEffect(() => {
    const onHash = () => setPage(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (next: Page) => {
    window.location.hash = `/${next}`;
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-canvas text-base leading-[1.6] text-ink dark:bg-canvas-dark dark:text-ink-dark">
      <Navbar page={page} onNavigate={navigate} dark={dark} onToggleTheme={() => setDark(!dark)} />
      {page === "create" && <CreatePage onNext={() => navigate("mix")} />}
      {page === "mix" && <MixPage onNext={() => navigate("preview")} />}
      {page === "preview" && <PreviewPage onNext={() => navigate("export")} />}
      {page === "saved" && <SavedPage onOpen={() => navigate("create")} />}
      {page === "export" && <ExportPage />}
    </div>
  );
}
