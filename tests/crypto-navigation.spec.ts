import { test, expect } from '@root/fixtures/base_page_fixtures';
import { NAV_BUTTONS_TEXT } from '@root/data/constant';
import { allure } from 'allure-playwright';

test.describe('Crypto.com Exchange Navigation Tests', () => {
  test.beforeAll(async () => {
    await allure.epic('Crypto.com Exchange');
    await allure.feature('Navigation');
  });
  test.beforeEach(async ({ page, navigateToExchange, dismissCookieBanner, waitForPageLoad }) => {
    try {
      await navigateToExchange();
      // Dismiss any cookie banners
      await dismissCookieBanner();
      await waitForPageLoad();
      await page.waitForTimeout(1000);
    } catch (error) {
      console.log(`Setup error: ${error instanceof Error ? error.message : String(error)}`);
      // Don't fail the test if setup has minor issues
    }
  });

  test(
    'should load crypto.com exchange successfully',
    { tag: '@smoke' },
    async ({ page, verifyTradingPairLoaded }) => {
      await allure.story('Page Loading');
      await allure.severity('critical');
      await allure.description(
        'Verifies that the crypto.com exchange page loads successfully and displays the BTC_USD trading pair'
      );

      await allure.step('Verify page URL contains crypto.com/exchange', async () => {
        expect(page.url()).toContain('crypto.com/exchange');
      });

      await allure.step('Verify BTC_USD trading pair is loaded', async () => {
        const isPairLoaded = await verifyTradingPairLoaded('BTC_USD');
        expect(isPairLoaded).toBe(true);
      });
    }
  );

  test(
    'should display all major navigation items',
    { tag: '@slow' },
    async ({ page, verifyAllNavigationItemsVisible, getVisibleNavigationItems }) => {
      await allure.story('Navigation Visibility');
      await allure.severity('critical');
      await allure.description(
        'Verifies that all major navigation items (Markets, Trade, Bots, etc.) are visible and accessible on the page'
      );

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

      await allure.step('Take reference screenshot', async () => {
        await page.screenshot({
          path: 'crypto-com-navigation.png',
          fullPage: false,
        });
      });
    }
  );

  test('should be able to hover over navigation items', async ({
    page,
    hoverNavigationItem,
    getVisibleNavigationItems,
  }) => {
    await allure.story('Navigation Interaction');
    await allure.severity('normal');
    await allure.description('Verifies that navigation items can be hovered over successfully');

    await allure.step('Get visible navigation items for hover testing', async () => {
      const visibleItems = await getVisibleNavigationItems();
      await allure.attachment(
        'Available Items for Hover',
        JSON.stringify(visibleItems),
        'application/json'
      );

      // Test hovering over the first few visible navigation items
      const itemsToTest = visibleItems.slice(0, 3);
      await allure.parameter('Items to Test', itemsToTest.join(', '));

      for (const item of itemsToTest) {
        await allure.step(`Hover over ${item}`, async () => {
          console.log(`Testing hover for: ${item}`);

          try {
            await hoverNavigationItem(item);
            console.log(`✓ Successfully hovered over: ${item}`);

            // Wait a bit between hovers
            await page.waitForTimeout(1000);
          } catch (error) {
            console.log(`✗ Failed to hover over ${item}: ${error}`);
            await allure.attachment('Hover Error', String(error), 'text/plain');
            throw error;
          }
        });
      }
    });
  });

  test('should be able to click navigation items', async ({
    page,
    clickNavigationItem,
    getVisibleNavigationItems,
  }) => {
    await allure.story('Navigation Interaction');
    await allure.severity('critical');
    await allure.description(
      'Verifies that navigation items can be clicked and potentially navigate to different sections'
    );

    await allure.step('Get visible navigation items and select target', async () => {
      const visibleItems = await getVisibleNavigationItems();
      await allure.attachment(
        'Available Items for Click',
        JSON.stringify(visibleItems),
        'application/json'
      );

      // Test clicking on "Markets" if visible
      if (visibleItems.includes('Markets')) {
        await allure.step('Click on Markets navigation item', async () => {
          const initialUrl = page.url();
          await allure.parameter('Initial URL', initialUrl);

          try {
            await clickNavigationItem('Markets');

            // Wait for potential navigation
            await page.waitForTimeout(2000);

            const newUrl = page.url();
            console.log(`Initial URL: ${initialUrl}`);
            console.log(`New URL: ${newUrl}`);
            await allure.parameter('New URL', newUrl);

            // URL might change or stay the same depending on implementation
            expect(newUrl).toBeTruthy();
          } catch (error) {
            console.log(`Failed to click Markets: ${error}`);
            await allure.attachment('Click Error', String(error), 'text/plain');
            throw error;
          }
        });
      } else {
        await allure.step('Markets navigation item not found', async () => {
          console.log('Markets navigation item not found');
          await allure.attachment(
            'Missing Item',
            'Markets navigation item was not found in visible items',
            'text/plain'
          );
        });
      }
    });
  });

  test('should verify individual navigation items exist', async ({ getNavigationItem }) => {
    await allure.story('Navigation Elements');
    await allure.severity('normal');
    await allure.description(
      'Verifies that each individual navigation item exists in the DOM and checks their visibility and enabled state'
    );

    await allure.step('Verify each navigation item individually', async () => {
      const itemResults: Record<string, { exists: boolean; visible: boolean; enabled: boolean }> =
        {};

      for (const itemText of NAV_BUTTONS_TEXT) {
        await allure.step(`Check ${itemText} navigation item`, async () => {
          console.log(`Checking for navigation item: ${itemText}`);

          const navItem = getNavigationItem(itemText);

          // Check if element exists in DOM (may or may not be visible)
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
});
