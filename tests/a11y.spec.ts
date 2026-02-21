import { test, expect } from '@playwright/test';

test.describe('Accessibility and Navigation', () => {
  test('homepage has skip navigation link', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.locator('text=Skip to main content');
    await expect(skipLink).toBeAttached();
    
    // Test keyboard visibility
    await page.keyboard.press('Tab');
    await expect(skipLink).toBeFocused();
    const isVisible = await skipLink.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('can navigate menu via keyboard', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // Home
    await page.keyboard.press('Tab'); // Projects
    
    const projectsLink = page.locator('nav a >> text=Case Studies');
    await expect(projectsLink).toBeFocused();
  });

  test('hero carousel is present and reachable', async ({ page }) => {
    await page.goto('/');
    const carousel = page.locator('[role="region"][aria-roledescription="carousel"]');
    await expect(carousel).toBeVisible();
    
    // Check if it's reachable via Tab (it should have a focusable link inside)
    // We'll tab until we hit it or exceed a reasonable limit
    let focused = false;
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press('Tab');
      const isActive = await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        return el && (el === document.activeElement || el.contains(document.activeElement));
      }, '[role="region"][aria-roledescription="carousel"]');
      
      if (isActive) {
        focused = true;
        break;
      }
    }
    expect(focused).toBeTruthy();
  });
});
