import { test, expect } from '@playwright/test';

test.describe('FPMarket Demo - Basic Navigation', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/FPMarket/);
  });

  test('should have valid navigation elements', async ({ page }) => {
    await page.goto('/');

    // Check for common navigation elements
    const navigation = page.locator('nav, [role="navigation"]');
    await expect(navigation).toBeVisible();
  });
});
