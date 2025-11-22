Feature: Crypto.com Exchange Navigation Tests
  As a user of Crypto.com exchange
  I want to navigate the website effectively
  So that I can access different trading and market sections

  Background:
    Given I navigate to the crypto.com exchange
    And I dismiss any cookie banners or modals
    And I wait for the page to load completely

  @smoke
  Scenario: Load crypto.com exchange successfully
    When I verify the page URL contains "crypto.com/exchange"
    And I verify the BTC_USD trading pair is loaded
    Then the crypto.com exchange should load successfully
    And the BTC_USD trading pair should be displayed

  @slow
  Scenario: Display all major navigation items
    When I get all visible navigation items
    And I verify all navigation items are visible
    Then all major navigation items should be displayed
    And I should be able to see navigation items list
    And I take a reference screenshot of the navigation

  Scenario: Hover over navigation items
    When I get visible navigation items for hover testing
    And I hover over the first 3 available navigation items
    Then the hover interactions should work correctly
    And all hovered items should remain visible

  Scenario: Click navigation items
    When I get visible navigation items for click testing
    And I click on the first available navigation item or "Markets"
    Then the navigation click should work properly
    And the page should remain on crypto.com domain

  Scenario: Verify individual navigation items exist
    When I check each navigation item individually
    And I verify their DOM existence, visibility, and enabled state
    Then at least some navigation items should exist in the DOM
    And I should have a complete status report of all items