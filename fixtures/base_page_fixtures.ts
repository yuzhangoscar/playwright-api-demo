import { test as base, expect, Locator } from '@playwright/test';
import {
  BASE_URL,
  NAV_BUTTONS_TEXT,
  LOADING_SPINNER,
  DEFAULT_TIMEOUT,
  NAVIGATION_TIMEOUT,
  ELEMENT_VISIBLE_TIMEOUT,
} from '@root/data/constant';

type CryptoComPageFixture = {
  navigateToExchange: () => Promise<void>;
  getNavigationItem: (itemText: string) => Locator;
  clickNavigationItem: (itemText: string) => Promise<void>;
  hoverNavigationItem: (itemText: string) => Promise<void>;
  verifyAllNavigationItemsVisible: () => Promise<boolean>;
  dismissCookieBanner: () => Promise<void>;
  waitForPageLoad: () => Promise<void>;
  verifyTradingPairLoaded: (pair?: string) => Promise<boolean>;
  getVisibleNavigationItems: () => Promise<string[]>;
};

export const test = base.extend<CryptoComPageFixture>({
  navigateToExchange: async ({ page }, use) => {
    const navigate = async (): Promise<void> => {
      await page.goto(BASE_URL, {
        waitUntil: 'domcontentloaded',
        timeout: DEFAULT_TIMEOUT,
      });
    };

    await use(navigate);
  },

  getNavigationItem: async ({ page }, use) => {
    const getNavItem = (itemText: string): Locator => {
      // Enhanced selector strategies for crypto.com navigation
      const selectors = [
        // Direct text matches
        `text="${itemText}"`,
        `*:has-text("${itemText}")`,

        // Navigation specific selectors
        `nav *:has-text("${itemText}")`,
        `header *:has-text("${itemText}")`,
        `[role="navigation"] *:has-text("${itemText}")`,

        // Link and button selectors
        `a:has-text("${itemText}")`,
        `button:has-text("${itemText}")`,
        `span:has-text("${itemText}")`,
        `div:has-text("${itemText}")`,

        // Attribute-based selectors
        `a[href*="${itemText.toLowerCase()}"]`,
        `[data-testid*="${itemText.toLowerCase()}"]`,
        `[data-cy*="${itemText.toLowerCase()}"]`,
        `[title="${itemText}"]`,
        `[aria-label="${itemText}"]`,
      ];

      for (const selector of selectors) {
        const element = page.locator(selector).first();
        return element;
      }

      // This should never be reached, but fallback anyway
      return page.locator(`text="${itemText}"`).first();
    };

    await use(getNavItem);
  },

  clickNavigationItem: async ({ page, getNavigationItem }, use) => {
    const clickNav = async (itemText: string): Promise<void> => {
      const navItem = getNavigationItem(itemText);

      await navItem.waitFor({ state: 'visible', timeout: ELEMENT_VISIBLE_TIMEOUT });
      await navItem.scrollIntoViewIfNeeded();
      await expect(navItem).toBeEnabled({ timeout: 5000 });
      await navItem.click({ timeout: 10000 });
      await page.waitForLoadState('domcontentloaded', { timeout: NAVIGATION_TIMEOUT });
    };

    await use(clickNav);
  },

  hoverNavigationItem: async ({ page, getNavigationItem }, use) => {
    const hoverNav = async (itemText: string): Promise<void> => {
      const navItem = getNavigationItem(itemText);

      await navItem.waitFor({ state: 'visible', timeout: ELEMENT_VISIBLE_TIMEOUT });
      await navItem.hover();
      await page.waitForTimeout(1000);
    };

    await use(hoverNav);
  },

  verifyAllNavigationItemsVisible: async ({ getNavigationItem }, use) => {
    const verifyAllVisible = async (): Promise<boolean> => {
      try {
        for (const itemText of NAV_BUTTONS_TEXT) {
          const navItem = getNavigationItem(itemText);
          const isVisible = await navItem.isVisible({ timeout: 5000 });

          if (!isVisible) {
            return false;
          }
        }

        return true;
      } catch {
        return false;
      }
    };

    await use(verifyAllVisible);
  },

  dismissCookieBanner: async ({ page }, use) => {
    const dismissCookies = async (): Promise<void> => {
      // Wait for page to settle
      await page.waitForTimeout(3000);
      const cookieDialog = page.locator('[role="dialog"]').first();

      if (await cookieDialog.isVisible({ timeout: 5000 })) {
        const dialogText = await cookieDialog.textContent();
        if (dialogText && dialogText.indexOf('We use cookies') !== -1) {
          const acceptButton = cookieDialog.locator(
            'button:has-text("Accept non-essential cookies")'
          );
          if (await acceptButton.isVisible({ timeout: 2000 })) {
            await acceptButton.click();
            await page.waitForTimeout(2000);
          }
        }
      }

      const skipButton = page.locator('button:has-text("Skip")').first();
      if (await skipButton.isVisible({ timeout: 5000 })) {
        await skipButton.click();
        await page.waitForTimeout(2000);
        return;
      }

      // Alternative: look for any dialog with Skip/Next buttons
      const dialogs = await page
        .locator('[role="dialog"], .modal, [class*="modal"], [class*="popup"]')
        .all();
      for (let i = 0; i < dialogs.length; i++) {
        const dialog = dialogs[i];
        if (await dialog.isVisible({ timeout: 1000 })) {
          const skipBtn = dialog.locator('button:has-text("Skip")');
          if (await skipBtn.isVisible({ timeout: 1000 })) {
            await skipBtn.click();
            await page.waitForTimeout(2000);
            return;
          }
        }
      }
    };

    await use(dismissCookies);
  },

  waitForPageLoad: async ({ page }, use) => {
    const waitForLoad = async (): Promise<void> => {
      // Wait for loading spinners to disappear
      const loadingSpinner = page.locator(LOADING_SPINNER);
      if (await loadingSpinner.isVisible({ timeout: 5000 })) {
        await loadingSpinner.waitFor({ state: 'hidden', timeout: DEFAULT_TIMEOUT });
      }

      // Wait for main content to be loaded
      await page.waitForSelector('main, [role="main"], .main-content', {
        timeout: DEFAULT_TIMEOUT,
        state: 'visible',
      });
    };

    await use(waitForLoad);
  },

  verifyTradingPairLoaded: async ({ page }, use) => {
    const verifyPair = async (pair: string = 'BTC_USD'): Promise<boolean> => {
      return page.url().indexOf(pair) !== -1;
    };

    await use(verifyPair);
  },

  getVisibleNavigationItems: async ({ getNavigationItem }, use) => {
    const getVisibleItems = async (): Promise<string[]> => {
      const visibleItems: string[] = [];

      for (const itemText of NAV_BUTTONS_TEXT) {
        // Use the same getNavigationItem logic for consistency
        const navItem = getNavigationItem(itemText);

        try {
          if (await navItem.isVisible({ timeout: 3000 })) {
            visibleItems.push(itemText);
          }
        } catch {
          // If the element doesn't exist or throws an error, skip it
          continue;
        }
      }

      return visibleItems;
    };

    await use(getVisibleItems);
  },
});

export { expect };
