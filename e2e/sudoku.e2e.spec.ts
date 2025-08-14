import { test, expect } from "@playwright/test";

test.describe("Sudoku App E2E", () => {
  const baseUrl = "http://localhost:3000/tanstack-sudoku";

  test("should load easy sudoku", async ({ page }) => {
    await page.goto(`${baseUrl}/sudoku/random/easy`);
    await expect(page.locator("input")).toHaveCount(81);
  });
});
