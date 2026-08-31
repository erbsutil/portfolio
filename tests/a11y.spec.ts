import { test, expect } from '@playwright/test';

test.describe('Accessibility and Navigation', () => {
  test('english home has skip navigation link', async ({ page }) => {
    await page.goto('/en/');
    const skipLink = page.locator('text=Skip to main content');
    await expect(skipLink).toBeAttached();

    await page.keyboard.press('Tab');
    await expect(skipLink).toBeFocused();
    const isVisible = await skipLink.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('skip link lands at the start of main content', async ({ page }) => {
    await page.goto('/en/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const skipLink = page.getByRole('link', { name: 'Skip to main content' });
    await skipLink.focus();
    await skipLink.press('Enter');

    await expect(page.locator('#main-content')).toBeFocused();

    const heroTitle = page.locator('.hero-title');
    await expect(heroTitle).toBeInViewport();

    const titleBox = await heroTitle.boundingBox();
    expect(titleBox).not.toBeNull();
    expect(titleBox!.y).toBeLessThan(200);
  });

  test('can navigate menu via keyboard', async ({ page, isMobile }) => {
    await page.goto('/en/');
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // Brand (home)

    if (isMobile) {
      return;
    }

    const casesLink = page.locator('nav a.nav-link', { hasText: 'Cases' });
    await expect(casesLink).toBeVisible();
    await casesLink.focus();
    await expect(casesLink).toBeFocused();
  });

  test('hero selected-work rail is present and reachable', async ({ page }) => {
    await page.goto('/en/');
    const rail = page.locator('.hero-rail');
    await expect(rail).toBeVisible();

    const firstItem = rail.locator('a').first();
    await expect(firstItem).toBeVisible();

    let focused = false;
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      const isActive = await page.evaluate(() => {
        const el = document.querySelector('.hero-rail');
        return Boolean(
          el &&
            (el === document.activeElement ||
              el.contains(document.activeElement)),
        );
      });

      if (isActive) {
        focused = true;
        break;
      }
    }
    expect(focused).toBeTruthy();
  });

  test('portuguese home renders translated hero', async ({ page }) => {
    await page.goto('/pt-BR/');
    await expect(page.locator('.hero-title')).toContainText('Arquitetura frontend');
    await expect(page.getByRole('link', { name: 'Ver cases' })).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  });

  test('mobile menu traps focus and restores on escape', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/en/');

    const toggle = page.locator('[data-nav-toggle]');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    const firstPanelLink = page.locator('[data-nav-panel] a').first();
    await expect(firstPanelLink).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
  });
});
