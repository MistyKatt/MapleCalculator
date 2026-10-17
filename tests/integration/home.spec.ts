import { expect, test } from "@playwright/test";

test("homepage loads directly and after refresh", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("MapleCalculator");
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1, name: "MapleCalculator" })).toBeVisible();

  await page.reload();
  await expect(page.getByText("项目正在搭建中，计算功能将于后续加入。")).toBeVisible();
  expect(errors).toEqual([]);
});
