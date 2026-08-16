# TintMint 🎨

TintMint is a color palette generator built for creating, exploring, and testing color combinations for web interfaces.

It provides a simple workspace for generating palettes, adjusting individual colors, previewing combinations, and checking how colors work together before using them in a project.

## Features

* Generate color palettes
* Create palettes from a selected base color
* Lock colors while generating new combinations
* Edit individual palette colors
* Copy HEX color values
* Explore shades and color variations
* Preview colors in interface examples
* Check color contrast and accessibility
* Save favorite palettes locally
* Light and dark theme support
* Responsive and keyboard-accessible interface

## Tech Stack

* **React**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **HTML5**
* **CSS3**
* **Playwright** for end-to-end testing

## Accessibility

TintMint is designed with accessibility in mind, including:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Accessible form controls
* ARIA attributes where appropriate
* Color contrast evaluation
* Responsive and readable interface design

## Getting Started

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Move into the project:

```bash
cd TintMint
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL displayed by Vite in your browser.

## Testing

TintMint uses Playwright for end-to-end testing.

Run the tests with:

```bash
npx playwright test
```

To view the Playwright test report:

```bash
npx playwright show-report
```

## Build

Create a production build with:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
tintmint/
├── src/                  # Application source code
├── tests/                # Playwright end-to-end tests
├── index.html
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── vite.config.ts
```


## Project Status

TintMint is actively being developed and improved.

## Author

**Pushpaja Bommisetty**

Computer Science graduate focused on frontend development, accessible web experiences, and user-friendly interfaces.
