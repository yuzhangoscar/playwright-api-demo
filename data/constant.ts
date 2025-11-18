export const BASE_URL: string = 'https://crypto.com/exchange/trade/BTC_USD';

export const NAVIGATION_BAR_ID: string = 'main-navigation';

// Main navigation menu items for crypto.com exchange
export const NAV_BUTTONS_IDS: string[] = [
  'markets',
  'trade',
  'bots',
  'yield',
  'institutions',
  'vip',
  'more',
];

export const NAV_BUTTONS_TEXT: string[] = [
  'Markets',
  'Trade',
  'Bots',
  'Yield',
  'Institutions & Partners',
  'VIP',
  'More',
];

export const USERNAME_ID: string = 'email';

export const PASSWORD_ID: string = 'password';

export const LOGIN_BUTTON_TEXT: string = 'Log In';

export const SIGNUP_BUTTON_TEXT: string = 'Sign Up';

export const CONNECT_WALLET_TEXT: string = 'Connect Wallet';

// Trading pair related constants
export const DEFAULT_TRADING_PAIR: string = 'BTC_USD';
export const TRADING_PAIRS_SELECTOR: string = "[data-testid='trading-pair-selector']";

// Page sections
export const HEADER_SELECTOR: string = 'header';
export const MAIN_CONTENT_SELECTOR: string = 'main';
export const TRADING_VIEW_SELECTOR: string = "[data-testid='trading-view']";
export const ORDER_BOOK_SELECTOR: string = "[data-testid='order-book']";
export const TRADE_FORM_SELECTOR: string = "[data-testid='trade-form']";
export const MOBILE_MENU_TOGGLE: string = "[data-testid='mobile-menu-toggle']";
export const MOBILE_NAV_MENU: string = "[data-testid='mobile-nav-menu']";

// Common selectors
export const COOKIE_BANNER: string = "[data-testid='cookie-banner']";
export const LOADING_SPINNER: string = "[data-testid='loading-spinner']";
export const ERROR_MESSAGE: string = "[data-testid='error-message']";

// Timeouts (in milliseconds) - Reduced for faster feedback
export const DEFAULT_TIMEOUT: number = 15000;
export const NAVIGATION_TIMEOUT: number = 8000;
export const ELEMENT_VISIBLE_TIMEOUT: number = 10000;
