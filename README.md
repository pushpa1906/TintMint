# TintMint

TintMint is a focused palette creation and exploration tool for frontend developers and UI designers.

The product flow is deliberately small:

**Create → Mix → Preview → Saved → Export**

## Why it was built

Many palette tools stop after producing swatches. TintMint continues the workflow: refine the colors, mix them, apply them to a realistic interface, adjust UI roles, save the palette locally and export developer-ready values.

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- HTML5
- Playwright
- localStorage

There is no backend, database, authentication, AI API or component library.

## Tailwind implementation

The interface is styled with Tailwind utility classes throughout the React components. `src/styles.css` is intentionally small and contains only:

- Tailwind import
- Inter font import
- Tailwind dark-mode custom variant
- a semantic color token theme (`canvas`, `surface`, `panel`, `ink`, `muted`, `line`, `field`, `accent`, each with a `-dark` counterpart) so every component references the same palette instead of scattering raw hex values
- minimal browser-level resets

It does **not** contain a second custom component CSS system.

## Visual direction

TintMint intentionally avoids a stereotypical generated SaaS appearance.

- Soft white `#FCFCFA` light canvas
- Warm near-black `#181817` dark canvas
- Inter for clean, highly readable letterforms
- 16px base text, 15–17px body copy
- 14–15px helper/instruction text
- a wide `max-w-[1600px]` content area with responsive 16–40px edge padding, so desktop content uses the available browser width instead of floating in a narrow column
- comfortable but not excessive section spacing
- minimal rounding
- no gradients
- no glassmorphism
- no decorative cards — panels are used only where grouping genuinely helps (e.g. a saved palette)
- no permanent colorful CTA system
- generated palette colors provide the personality

## Create

The Create page provides:

- Native visual color picker
- HEX input
- Random starting color
- Complementary
- Analogous
- Monochromatic
- Triadic
- Split Complementary
- Tetradic
- Human-readable meaning for the selected relationship
- Balanced
- Soft
- Bold
- Pastel
- Deep
- Muted
- Human-readable meaning for the selected theme
- Generate
- Drag-to-reorder
- Automatic light → dark reorder
- Add/remove colors
- Lock colors
- Manual editing
- 50–900 shade generation

Advanced editing appears only after a user selects a swatch.

## Mix

Users can drag palette colors into two mixer positions, adjust the percentage and add the digitally interpolated RGB result back to the palette.

## Preview

Preview separates two ideas:

**Working palette** — can still be rearranged, regenerated and extended.

**Applied palette** — the colors currently shown on the example website.

The example does not silently change. The user explicitly chooses **Apply palette** or **Apply changes**.

Color-role customization and the 60/30/10 guide are collapsed until requested.

## Saved palettes

Saved palettes use localStorage only. Users can name, save, open and delete palettes.

## Export

- CSS variables
- JSON
- HEX
- Copy
- Download
- Contrastly URL handoff

## Appearance

The navbar contains one accessible icon-only Light/Dark toggle (`IconButton` + a Sun/Moon icon from `lucide-react`). Its `aria-label` updates between "Switch to dark theme" and "Switch to light theme" depending on the current state, and it has a visible `focus-visible` ring for keyboard users.

The appearance preference is persisted in localStorage and is separate from TintMint's palette Theme choices.

## Architecture

```text
src/
  components/
    common/
      Badge.tsx
      Button.tsx
      Card.tsx
      IconButton.tsx
      Input.tsx
      PageHeader.tsx
      SectionHeader.tsx
      Select.tsx
    layout/
      PageContainer.tsx
    navigation/
      Navbar.tsx
      ThemeToggle.tsx
    palette/
      AddColor.tsx
      ColorEditor.tsx
      ColorInput.tsx
      ColorPicker.tsx
      ColorSwatch.tsx
      OptionSelector.tsx
      PaletteCard.tsx
      PaletteStrip.tsx
      RelationshipSelector.tsx
      RoleEditor.tsx
      ThemeSelector.tsx
      UIPreview.tsx
  context/
    PaletteContext.tsx
  hooks/
    useAppearance.ts
    useClipboard.ts
  pages/
    CreatePage.tsx
    ExportPage.tsx
    MixPage.tsx
    PreviewPage.tsx
    SavedPage.tsx
  types/
    palette.ts
  utils/
    color.ts
```

Components are grouped by role: `common/` holds generic UI primitives (buttons, inputs, headers) used across the whole app, `layout/` holds the single `PageContainer` responsible for the app's horizontal page padding and max width, `navigation/` holds the navbar and theme toggle, and `palette/` holds everything specific to color/palette editing. `RelationshipSelector` and `ThemeSelector` are now thin wrappers around a shared `OptionSelector`, since they were previously near-identical code with different data.

Shared palette state lives in React Context because every page operates on the same palette. Pure color calculations stay outside React in `utils/color.ts`.

## Local setup

```bash
npm install
npx playwright install chromium
npm run dev
```

## Validation

```bash
npm run typecheck
npm run build
npm run test:e2e
```

## Interview explanation

TintMint demonstrates:

- React component architecture
- shared state without a third-party state library
- TypeScript domain types
- HSL color relationships
- RGB interpolation
- native drag-and-drop
- accessible alternatives to drag interactions
- responsive Tailwind CSS
- persistent interface theme
- localStorage persistence
- clipboard and file-download browser APIs
- Playwright end-to-end testing
