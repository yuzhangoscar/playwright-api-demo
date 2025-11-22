// Generated from: features/crypto-navigation.feature
import { test } from '../../features/fixtures/bdd-fixtures.ts';

test.describe('Crypto.com Exchange Navigation Tests', () => {
  test.beforeEach(
    'Background',
    async (
      { Given, And, dismissCookieBanner, navigateToExchange, page, waitForPageLoad },
      testInfo
    ) => {
      if (testInfo.error) return;
      await Given('I navigate to the crypto.com exchange', null, { navigateToExchange, page });
      await And('I dismiss any cookie banners or modals', null, { dismissCookieBanner });
      await And('I wait for the page to load completely', null, { page, waitForPageLoad });
    }
  );

  test(
    'Load crypto.com exchange successfully',
    { tag: ['@smoke'] },
    async ({ When, Then, And, page, verifyTradingPairLoaded }) => {
      await When('I verify the page URL contains "crypto.com/exchange"', null, { page });
      await And('I verify the BTC_USD trading pair is loaded', null, { verifyTradingPairLoaded });
      await Then('the crypto.com exchange should load successfully');
      await And('the BTC_USD trading pair should be displayed');
    }
  );

  test(
    'Display all major navigation items',
    { tag: ['@slow'] },
    async ({
      When,
      Then,
      And,
      getVisibleNavigationItems,
      page,
      verifyAllNavigationItemsVisible,
    }) => {
      await When('I get all visible navigation items', null, { getVisibleNavigationItems });
      await And('I verify all navigation items are visible', null, {
        getVisibleNavigationItems,
        verifyAllNavigationItemsVisible,
      });
      await Then('all major navigation items should be displayed');
      await And('I should be able to see navigation items list');
      await And('I take a reference screenshot of the navigation', null, { page });
    }
  );

  test('Hover over navigation items', async ({
    When,
    Then,
    And,
    getVisibleNavigationItems,
    hoverNavigationItem,
    page,
  }) => {
    await When('I get visible navigation items for hover testing', null, {
      getVisibleNavigationItems,
    });
    await And('I hover over the first 3 available navigation items', null, {
      getVisibleNavigationItems,
      hoverNavigationItem,
      page,
    });
    await Then('the hover interactions should work correctly');
    await And('all hovered items should remain visible');
  });

  test('Click navigation items', async ({
    When,
    Then,
    And,
    clickNavigationItem,
    getVisibleNavigationItems,
    page,
  }) => {
    await When('I get visible navigation items for click testing', null, {
      getVisibleNavigationItems,
    });
    await And('I click on the first available navigation item or "Markets"', null, {
      clickNavigationItem,
      getVisibleNavigationItems,
      page,
    });
    await Then('the navigation click should work properly');
    await And('the page should remain on crypto.com domain');
  });

  test('Verify individual navigation items exist', async ({
    When,
    Then,
    And,
    getNavigationItem,
  }) => {
    await When('I check each navigation item individually', null, { getNavigationItem });
    await And('I verify their DOM existence, visibility, and enabled state');
    await Then('at least some navigation items should exist in the DOM', null, {
      getNavigationItem,
    });
    await And('I should have a complete status report of all items');
  });
});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/crypto-navigation.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: 'test', box: true }],
});

const bddFileData = [
  // bdd-data-start
  {
    pwTestLine: 12,
    pickleLine: 12,
    tags: ['@smoke'],
    steps: [
      {
        pwStepLine: 7,
        gherkinStepLine: 7,
        keywordType: 'Context',
        textWithKeyword: 'Given I navigate to the crypto.com exchange',
        isBg: true,
        stepMatchArguments: [],
      },
      {
        pwStepLine: 8,
        gherkinStepLine: 8,
        keywordType: 'Context',
        textWithKeyword: 'And I dismiss any cookie banners or modals',
        isBg: true,
        stepMatchArguments: [],
      },
      {
        pwStepLine: 9,
        gherkinStepLine: 9,
        keywordType: 'Context',
        textWithKeyword: 'And I wait for the page to load completely',
        isBg: true,
        stepMatchArguments: [],
      },
      {
        pwStepLine: 13,
        gherkinStepLine: 13,
        keywordType: 'Action',
        textWithKeyword: 'When I verify the page URL contains "crypto.com/exchange"',
        stepMatchArguments: [
          {
            group: {
              start: 31,
              value: '"crypto.com/exchange"',
              children: [
                { start: 32, value: 'crypto.com/exchange', children: [{ children: [] }] },
                { children: [{ children: [] }] },
              ],
            },
            parameterTypeName: 'string',
          },
        ],
      },
      {
        pwStepLine: 14,
        gherkinStepLine: 14,
        keywordType: 'Action',
        textWithKeyword: 'And I verify the BTC_USD trading pair is loaded',
        stepMatchArguments: [],
      },
      {
        pwStepLine: 15,
        gherkinStepLine: 15,
        keywordType: 'Outcome',
        textWithKeyword: 'Then the crypto.com exchange should load successfully',
        stepMatchArguments: [],
      },
      {
        pwStepLine: 16,
        gherkinStepLine: 16,
        keywordType: 'Outcome',
        textWithKeyword: 'And the BTC_USD trading pair should be displayed',
        stepMatchArguments: [],
      },
    ],
  },
  {
    pwTestLine: 19,
    pickleLine: 19,
    slow: true,
    tags: ['@slow'],
    steps: [
      {
        pwStepLine: 7,
        gherkinStepLine: 7,
        keywordType: 'Context',
        textWithKeyword: 'Given I navigate to the crypto.com exchange',
        isBg: true,
        stepMatchArguments: [],
      },
      {
        pwStepLine: 8,
        gherkinStepLine: 8,
        keywordType: 'Context',
        textWithKeyword: 'And I dismiss any cookie banners or modals',
        isBg: true,
        stepMatchArguments: [],
      },
      {
        pwStepLine: 9,
        gherkinStepLine: 9,
        keywordType: 'Context',
        textWithKeyword: 'And I wait for the page to load completely',
        isBg: true,
        stepMatchArguments: [],
      },
      {
        pwStepLine: 20,
        gherkinStepLine: 20,
        keywordType: 'Action',
        textWithKeyword: 'When I get all visible navigation items',
        stepMatchArguments: [],
      },
      {
        pwStepLine: 21,
        gherkinStepLine: 21,
        keywordType: 'Action',
        textWithKeyword: 'And I verify all navigation items are visible',
        stepMatchArguments: [],
      },
      {
        pwStepLine: 22,
        gherkinStepLine: 22,
        keywordType: 'Outcome',
        textWithKeyword: 'Then all major navigation items should be displayed',
        stepMatchArguments: [],
      },
      {
        pwStepLine: 23,
        gherkinStepLine: 23,
        keywordType: 'Outcome',
        textWithKeyword: 'And I should be able to see navigation items list',
        stepMatchArguments: [],
      },
      {
        pwStepLine: 24,
        gherkinStepLine: 24,
        keywordType: 'Outcome',
        textWithKeyword: 'And I take a reference screenshot of the navigation',
        stepMatchArguments: [],
      },
    ],
  },
  {
    pwTestLine: 27,
    pickleLine: 26,
    tags: [],
    steps: [
      {
        pwStepLine: 7,
        gherkinStepLine: 7,
        keywordType: 'Context',
        textWithKeyword: 'Given I navigate to the crypto.com exchange',
        isBg: true,
        stepMatchArguments: [],
      },
      {
        pwStepLine: 8,
        gherkinStepLine: 8,
        keywordType: 'Context',
        textWithKeyword: 'And I dismiss any cookie banners or modals',
        isBg: true,
        stepMatchArguments: [],
      },
      {
        pwStepLine: 9,
        gherkinStepLine: 9,
        keywordType: 'Context',
        textWithKeyword: 'And I wait for the page to load completely',
        isBg: true,
        stepMatchArguments: [],
      },
      {
        pwStepLine: 28,
        gherkinStepLine: 27,
        keywordType: 'Action',
        textWithKeyword: 'When I get visible navigation items for hover testing',
        stepMatchArguments: [],
      },
      {
        pwStepLine: 29,
        gherkinStepLine: 28,
        keywordType: 'Action',
        textWithKeyword: 'And I hover over the first 3 available navigation items',
        stepMatchArguments: [],
      },
      {
        pwStepLine: 30,
        gherkinStepLine: 29,
        keywordType: 'Outcome',
        textWithKeyword: 'Then the hover interactions should work correctly',
        stepMatchArguments: [],
      },
      {
        pwStepLine: 31,
        gherkinStepLine: 30,
        keywordType: 'Outcome',
        textWithKeyword: 'And all hovered items should remain visible',
        stepMatchArguments: [],
      },
    ],
  },
  {
    pwTestLine: 34,
    pickleLine: 32,
    tags: [],
    steps: [
      {
        pwStepLine: 7,
        gherkinStepLine: 7,
        keywordType: 'Context',
        textWithKeyword: 'Given I navigate to the crypto.com exchange',
        isBg: true,
        stepMatchArguments: [],
      },
      {
        pwStepLine: 8,
        gherkinStepLine: 8,
        keywordType: 'Context',
        textWithKeyword: 'And I dismiss any cookie banners or modals',
        isBg: true,
        stepMatchArguments: [],
      },
      {
        pwStepLine: 9,
        gherkinStepLine: 9,
        keywordType: 'Context',
        textWithKeyword: 'And I wait for the page to load completely',
        isBg: true,
        stepMatchArguments: [],
      },
      {
        pwStepLine: 35,
        gherkinStepLine: 33,
        keywordType: 'Action',
        textWithKeyword: 'When I get visible navigation items for click testing',
        stepMatchArguments: [],
      },
      {
        pwStepLine: 36,
        gherkinStepLine: 34,
        keywordType: 'Action',
        textWithKeyword: 'And I click on the first available navigation item or "Markets"',
        stepMatchArguments: [
          {
            group: {
              start: 50,
              value: '"Markets"',
              children: [
                { start: 51, value: 'Markets', children: [{ children: [] }] },
                { children: [{ children: [] }] },
              ],
            },
            parameterTypeName: 'string',
          },
        ],
      },
      {
        pwStepLine: 37,
        gherkinStepLine: 35,
        keywordType: 'Outcome',
        textWithKeyword: 'Then the navigation click should work properly',
        stepMatchArguments: [],
      },
      {
        pwStepLine: 38,
        gherkinStepLine: 36,
        keywordType: 'Outcome',
        textWithKeyword: 'And the page should remain on crypto.com domain',
        stepMatchArguments: [],
      },
    ],
  },
  {
    pwTestLine: 41,
    pickleLine: 38,
    tags: [],
    steps: [
      {
        pwStepLine: 7,
        gherkinStepLine: 7,
        keywordType: 'Context',
        textWithKeyword: 'Given I navigate to the crypto.com exchange',
        isBg: true,
        stepMatchArguments: [],
      },
      {
        pwStepLine: 8,
        gherkinStepLine: 8,
        keywordType: 'Context',
        textWithKeyword: 'And I dismiss any cookie banners or modals',
        isBg: true,
        stepMatchArguments: [],
      },
      {
        pwStepLine: 9,
        gherkinStepLine: 9,
        keywordType: 'Context',
        textWithKeyword: 'And I wait for the page to load completely',
        isBg: true,
        stepMatchArguments: [],
      },
      {
        pwStepLine: 42,
        gherkinStepLine: 39,
        keywordType: 'Action',
        textWithKeyword: 'When I check each navigation item individually',
        stepMatchArguments: [],
      },
      {
        pwStepLine: 43,
        gherkinStepLine: 40,
        keywordType: 'Action',
        textWithKeyword: 'And I verify their DOM existence, visibility, and enabled state',
        stepMatchArguments: [],
      },
      {
        pwStepLine: 44,
        gherkinStepLine: 41,
        keywordType: 'Outcome',
        textWithKeyword: 'Then at least some navigation items should exist in the DOM',
        stepMatchArguments: [],
      },
      {
        pwStepLine: 45,
        gherkinStepLine: 42,
        keywordType: 'Outcome',
        textWithKeyword: 'And I should have a complete status report of all items',
        stepMatchArguments: [],
      },
    ],
  },
]; // bdd-data-end
