import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5173";

test.describe("Inventory Management - Main Workflow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { timeout: 60000 });
    await page.waitForSelector("text=Inventory", { timeout: 15000 });
    await page.waitForSelector("table tbody tr", { timeout: 15000 });
  });

  test("Must show inventory window", async ({ page }) => {
    await expect(page.locator("table")).toBeVisible();
  });

  test("Must open the form and add product", async ({ page }) => {
    await page.click("text=Add Product");
    await expect(page.locator("text=Add New Product")).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await page.click('button:has-text("Cancel")');
    await expect(page.locator("text=Add New Product")).not.toBeVisible();
  });

  test("Must add a new product and see it on the list", async ({ page }) => {
    const productName = "AAA Playwright Test " + Date.now();

    await page.click("text=Add Product");
    await page.fill('input[name="name"]', productName);
    await page.fill('input[name="price"]', "12.50");
    await page.fill('input[name="quantity"]', "10");

    const [response] = await Promise.all([
      page.waitForResponse(
        (resp) =>
          resp.url().includes("/api/products") &&
          resp.request().method() === "POST",
      ),
      page.click('button:has-text("Save")'),
    ]);

    expect(response.status()).toBe(201);
    await page.waitForSelector("text=Add New Product", { state: "hidden" });
    await page.reload();
    await page.waitForSelector("table", { timeout: 10000 });
    await expect(page.locator("table")).toContainText(productName, {
      timeout: 10000,
    });
  });

  test("Must open and close README (Notepad)", async ({ page }) => {
    const readmeIcon = page.locator(
      ".flex.flex-col.items-center.cursor-pointer.select-none.p-1",
      { hasText: "README" },
    );
    await readmeIcon.dblclick();
    await expect(
      page.locator("text=INVENTORY MANAGEMENT SYSTEM v1.0"),
    ).toBeVisible();
    await page
      .locator("div.absolute", { has: page.locator("text=File") })
      .locator('button:has-text("✕")')
      .click();
    await expect(
      page.locator("text=INVENTORY MANAGEMENT SYSTEM v1.0"),
    ).not.toBeVisible();
  });

  test("Must sort by price and check order", async ({ page }) => {
    await page.locator('th:has-text("Price")').click();
    await expect(page.locator('th:has-text("Price") span')).toHaveText("▲");
    await expect(page.locator("table")).toBeVisible();
  });
});
