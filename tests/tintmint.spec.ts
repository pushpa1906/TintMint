import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/#/create");
  await page.evaluate(() => localStorage.clear());
});

test("generates a palette with relationship and theme", async ({ page }) => {
const tetradicButton = page.getByRole("button", {
  name: "Tetradic",
  exact: true,
});

await tetradicButton.focus();
await page.keyboard.press("Enter");

await expect(tetradicButton).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText(/Uses two complementary color pairs/)).toBeVisible();
  await page.getByRole("button", { name: "Bold" }).click();
  await expect(page.getByText(/stronger saturation and contrast/)).toBeVisible();
  await page.getByRole("button", { name: "Generate palette" }).click();
  await expect(page.getByLabel("Current palette")).toBeVisible();
});

test("edits and locks a color", async ({ page }) => {
  await page.getByRole("button", { name: /Select #/ }).first().click();
  await page.getByLabel("Selected color HEX").fill("#123456");
  await page.getByLabel("Selected color HEX").blur();
  await expect(page.getByText("#123456", { exact: true }).first()).toBeVisible();
  await page.getByRole("button", { name: "Lock", exact: true }).last().click();
});

test("mixes colors", async ({ page }) => {
  await page.getByRole("button", { name: "Mix", exact: true }).click();
  await page.getByLabel("How much Color B?").fill("65");
  await page.getByRole("button", { name: "+ Add to palette" }).click();
  await expect(page.getByText("Result")).toBeVisible();
});

test("preview requires explicit apply", async ({ page }) => {
  await page.getByRole("button", { name: "Preview" }).click();
  await expect(page.getByText("No palette applied yet.")).toBeVisible();
  await page.getByRole("button", { name: "Apply palette" }).click();
  await expect(page.getByLabel("desktop live UI preview")).toBeVisible();
  await page.getByRole("button", { name: "Mobile" }).click();
  await expect(page.getByLabel("mobile live UI preview")).toBeVisible();
});

test("preview supports progressive role controls", async ({ page }) => {
  await page.getByRole("button", { name: "Preview" }).click();
  await page.getByRole("button", { name: "Apply palette" }).click();
  await page.getByRole("button", { name: /Customize color roles/ }).click();
  await expect(page.getByLabel("Change Primary")).toBeVisible();
  await page.getByRole("button", { name: /60 \/ 30 \/ 10/ }).click();
  await expect(page.getByText(/design guideline/)).toBeVisible();
});

test("saves and opens a palette", async ({ page }) => {
  await page.getByRole("button", { name: "Saved" }).click();
  await page.getByLabel("Palette name").fill("Portfolio palette");
  await page.getByRole("button", { name: "Save current palette" }).click();
  await expect(page.getByRole("heading", { name: "Portfolio palette" })).toBeVisible();
  await page.getByRole("button", { name: "Open" }).click();
  await expect(page.getByRole("heading", { name: "Create a palette" })).toBeVisible();
});

test("exports CSS and JSON", async ({ page }) => {
  await page.getByRole("button", { name: "Export" }).click();
  await expect(page.locator("pre")).toContainText("--color-primary");
  await page.getByRole("tab", { name: "JSON" }).click();
  await expect(page.locator("pre")).toContainText('"primary"');
});

test("theme toggle persists", async ({ page }) => {
  const themeToggle = page.getByRole("button", { name: "Switch to dark theme" });
  await themeToggle.click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(page.getByRole("button", { name: "Switch to light theme" })).toBeVisible();
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
});

test("main navigation works with keyboard", async ({ page }) => {
  await page.getByRole("button", { name: "Create", exact: true }).focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Mix", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "Mix colors" })).toBeVisible();
});
