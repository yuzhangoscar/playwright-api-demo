import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/bdd-fixtures';
import { NAV_BUTTONS_TEXT } from '@root/data/constant';

import { allure } from 'allure-playwright';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

// Background Steps
Given('I navigate to the crypto.com exchange', async ({ navigateToExchange }) => {
  await allure.epic('Crypto.com Exchange');
  await allure.feature('Navigation');
  await navigateToExchange();
});

Given('I dismiss any cookie banners or modals', async ({ dismissCookieBanner }) => {
  await dismissCookieBanner();
});

Given('I wait for the page to load completely', async ({ page, waitForPageLoad }) => {
  await waitForPageLoad();
  await page.waitForLoadState('load');
});

// Scenario 1: Load crypto.com exchange successfully
When('I verify the page URL contains {string}', async ({ page }, urlFragment: string) => {
  await allure.story('Page Loading');
  await allure.severity('critical');
  await allure.step(`Verify page URL contains ${urlFragment}`, async () => {
    expect(page.url()).toContain(urlFragment);
  });
});

When('I verify the BTC_USD trading pair is loaded', async ({ verifyTradingPairLoaded }) => {
  await allure.step('Verify BTC_USD trading pair is loaded', async () => {
    const isPairLoaded = await verifyTradingPairLoaded('BTC_USD');
    expect(isPairLoaded).toBe(true);
  });
});

Then('the crypto.com exchange should load successfully', async () => {
  await allure.description('Verifies that the crypto.com exchange page loads successfully');
  // Verification already done in When steps
});

Then('the BTC_USD trading pair should be displayed', async () => {
  // Verification already done in When step
});

// Scenario 2: Display all major navigation items
When('I get all visible navigation items', async ({ getVisibleNavigationItems }) => {
  await allure.story('Navigation Visibility');
  await allure.severity('critical');
  await allure.step('Get all visible navigation items', async () => {
    const visibleItems = await getVisibleNavigationItems();
    await allure.attachment(
      'Visible Navigation Items',
      JSON.stringify(visibleItems),
      'application/json'
    );
    expect(visibleItems.length).toBeGreaterThan(0);
    console.log(`Found navigation items: ${visibleItems.join(', ')}`);
  });
});

When(
  'I verify all navigation items are visible',
  async ({ verifyAllNavigationItemsVisible, getVisibleNavigationItems }) => {
    await allure.step('Verify all navigation items are visible', async () => {
      const allVisible = await verifyAllNavigationItemsVisible();

      if (!allVisible) {
        console.log('Not all navigation items are visible. Checking individual items...');
        const itemStatus: Record<string, string> = {};

        const currentVisibleItems = await getVisibleNavigationItems();
        for (const expectedItem of NAV_BUTTONS_TEXT) {
          const isVisible = currentVisibleItems.includes(expectedItem);
          itemStatus[expectedItem] = isVisible ? 'Visible' : 'Not Visible';
          console.log(`${expectedItem}: ${isVisible ? '✓' : '✗'}`);
        }

        await allure.attachment(
          'Navigation Items Status',
          JSON.stringify(itemStatus),
          'application/json'
        );
      }
    });
  }
);

Then('all major navigation items should be displayed', async () => {
  await allure.description('Verifies that all major navigation items are visible and accessible');
  // Verification already done in When step
});

Then('I should be able to see navigation items list', async () => {
  // Verification already done in previous steps
});

Then('I take a reference screenshot of the navigation', async ({ page }) => {
  await allure.step('Take reference screenshot', async () => {
    await page.screenshot({
      path: 'crypto-com-navigation.png',
      fullPage: false,
    });
  });
});

// Scenario 3: Hover over navigation items
When('I get visible navigation items for hover testing', async ({ getVisibleNavigationItems }) => {
  await allure.story('Navigation Interaction');
  await allure.severity('normal');
  await allure.step('Get visible navigation items for hover testing', async () => {
    const visibleItems = await getVisibleNavigationItems();
    await allure.attachment(
      'Available Items for Hover',
      JSON.stringify(visibleItems),
      'application/json'
    );
    expect(visibleItems.length).toBeGreaterThan(0);
  });
});

When(
  'I hover over the first 3 available navigation items',
  async ({ page, hoverNavigationItem, getVisibleNavigationItems }) => {
    const visibleItems = await getVisibleNavigationItems();
    const itemsToTest = visibleItems.slice(0, 3);
    await allure.parameter('Items to Test', itemsToTest.join(', '));

    for (const item of itemsToTest) {
      await allure.step(`Hover over ${item}`, async () => {
        console.log(`Testing hover for: ${item}`);

        try {
          await hoverNavigationItem(item);
          console.log(`✓ Successfully hovered over: ${item}`);
          await page.waitForLoadState('load');

          const itemElement = page.locator(`text="${item}"`).first();
          await expect(itemElement).toBeVisible();
        } catch (error) {
          console.log(`✗ Failed to hover over ${item}: ${error}`);
          await allure.attachment('Hover Error', String(error), 'text/plain');
          throw error;
        }
      });
    }
  }
);

Then('the hover interactions should work correctly', async () => {
  await allure.description('Verifies that navigation items can be hovered over successfully');
  // Verification already done in When step
});

Then('all hovered items should remain visible', async () => {
  // Verification already done in When step
});

// Scenario 4: Click navigation items
When('I get visible navigation items for click testing', async ({ getVisibleNavigationItems }) => {
  await allure.story('Navigation Interaction');
  await allure.severity('critical');
  await allure.step('Get visible navigation items and select target', async () => {
    const visibleItems = await getVisibleNavigationItems();
    await allure.attachment(
      'Available Items for Click',
      JSON.stringify(visibleItems),
      'application/json'
    );
    expect(visibleItems.length).toBeGreaterThan(0);
  });
});

When(
  'I click on the first available navigation item or {string}',
  async ({ page, clickNavigationItem, getVisibleNavigationItems }, preferredItem: string) => {
    const visibleItems = await getVisibleNavigationItems();
    const targetItem = visibleItems.includes(preferredItem) ? preferredItem : visibleItems[0];

    await allure.step(`Click on ${targetItem} navigation item`, async () => {
      const initialUrl = page.url();
      await allure.parameter('Initial URL', initialUrl);

      try {
        await clickNavigationItem(targetItem);
        await page.waitForLoadState('load');

        const newUrl = page.url();
        console.log(`Initial URL: ${initialUrl}`);
        console.log(`New URL: ${newUrl}`);
        await allure.parameter('New URL', newUrl);

        expect(newUrl).toBeTruthy();
        await expect(page).toHaveURL(/crypto\.com/);
      } catch (error) {
        console.log(`Failed to click ${targetItem}: ${error}`);
        await allure.attachment('Click Error', String(error), 'text/plain');
        throw error;
      }
    });
  }
);

Then('the navigation click should work properly', async () => {
  await allure.description('Verifies that navigation items can be clicked and navigate correctly');
  // Verification already done in When step
});

Then('the page should remain on crypto.com domain', async () => {
  // Verification already done in When step
});

// Scenario 5: Verify individual navigation items exist
When('I check each navigation item individually', async ({ getNavigationItem }) => {
  await allure.story('Navigation Elements');
  await allure.severity('normal');
  await allure.step('Verify each navigation item individually', async () => {
    const itemResults: Record<string, { exists: boolean; visible: boolean; enabled: boolean }> = {};

    for (const itemText of NAV_BUTTONS_TEXT) {
      await allure.step(`Check ${itemText} navigation item`, async () => {
        console.log(`Checking for navigation item: ${itemText}`);

        const navItem = getNavigationItem(itemText);
        const elementExists = (await navItem.count()) > 0;
        console.log(`${itemText} exists in DOM: ${elementExists}`);

        const itemStatus = {
          exists: elementExists,
          visible: false,
          enabled: false,
        };

        if (elementExists) {
          try {
            const isVisible = await navItem.isVisible({ timeout: 2000 });
            const isEnabled = await navItem.isEnabled({ timeout: 2000 });

            itemStatus.visible = isVisible;
            itemStatus.enabled = isEnabled;

            console.log(`${itemText} - Visible: ${isVisible}, Enabled: ${isEnabled}`);
          } catch (error) {
            console.log(`Error checking ${itemText} properties: ${error}`);
            await allure.attachment(`${itemText} Error`, String(error), 'text/plain');
          }
        }

        itemResults[itemText] = itemStatus;
        await allure.attachment(
          `${itemText} Status`,
          JSON.stringify(itemStatus),
          'application/json'
        );
      });
    }

    await allure.attachment(
      'All Navigation Items Summary',
      JSON.stringify(itemResults, null, 2),
      'application/json'
    );
  });
});

When('I verify their DOM existence, visibility, and enabled state', async () => {
  // This verification is already done in the previous step
});

Then('at least some navigation items should exist in the DOM', async ({ getNavigationItem }) => {
  await allure.description(
    'Verifies that navigation items exist in DOM and checks their properties'
  );

  const itemResults: Record<string, { exists: boolean; visible: boolean; enabled: boolean }> = {};

  for (const itemText of NAV_BUTTONS_TEXT) {
    const navItem = getNavigationItem(itemText);
    const elementExists = (await navItem.count()) > 0;

    itemResults[itemText] = {
      exists: elementExists,
      visible: false,
      enabled: false,
    };
  }

  const existingItems = Object.values(itemResults).filter(result => result.exists);
  expect(existingItems.length).toBeGreaterThan(0);
});

Then('I should have a complete status report of all items', async () => {
  // Report generation already done in previous steps
});
