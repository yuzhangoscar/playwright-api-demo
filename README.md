# Playwright E2E Testing Framework

## 🏷️ Active Module Versions & Badges

[![Playwright Tests](https://img.shields.io/badge/playwright-1.48.0-blue)](https://playwright.dev/)
[![Playwright BDD](https://img.shields.io/badge/playwright--bdd-latest-green)](https://github.com/vitalets/playwright-bdd)
[![TypeScript](https://img.shields.io/badge/typescript-5.9.3-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/node.js-≥16.0.0-green)](https://nodejs.org/)
[![Allure](https://img.shields.io/badge/allure--playwright-3.4.2-orange)](https://github.com/allure-framework/allure-js)
[![Axe Core](https://img.shields.io/badge/axe--core-4.11.0-purple)](https://github.com/dequelabs/axe-core)
[![ESLint](https://img.shields.io/badge/eslint-8.57.1-purple)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/prettier-3.6.2-ff69b4)](https://prettier.io/)
[![Jest](https://img.shields.io/badge/jest-29.7.0-red)](https://jestjs.io/)
[![Express](https://img.shields.io/badge/express-4.18.2-lightgrey)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/docker-supported-blue)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### 📦 Core Dependencies

| **Testing Framework** | **Version** | **Accessibility**    | **Version** | **Development** | **Version** |
| --------------------- | ----------- | -------------------- | ----------- | --------------- | ----------- |
| @playwright/test      | 1.48.0      | @axe-core/playwright | 4.11.0      | typescript      | 5.9.3       |
| playwright-bdd        | latest      | axe-core             | 4.11.0      | eslint          | 8.57.1      |
| allure-playwright     | 3.4.2       |                      |             | prettier        | 3.6.2       |
| allure-commandline    | 2.34.1      |                      |             | husky           | 9.1.7       |
| jest                  | 29.7.0      |                      |             |                 |             |

| **API Server** | **Version** | **Type Definitions** | **Version** | **Linting & Formatting**         | **Version** |
| -------------- | ----------- | -------------------- | ----------- | -------------------------------- | ----------- |
| express        | 4.18.2      | @types/node          | 24.10.1     | @typescript-eslint/parser        | 8.47.0      |
| cors           | 2.8.5       | @types/express       | 4.17.21     | @typescript-eslint/eslint-plugin | 8.47.0      |
| helmet         | 7.1.0       | @types/jest          | 29.5.12     | eslint-plugin-playwright         | 2.3.0       |
| morgan         | 1.10.0      | @types/supertest     | 6.0.2       | eslint-config-prettier           | 10.1.8      |

---

## 🚀 Quick Start

A comprehensive E2E testing framework with Playwright, WCAG accessibility testing, Allure reporting, and Docker support for crypto trading platform validation.

### 📦 Prerequisites & Installation

```bash
# Prerequisites: Node.js ≥16.0.0, Docker (optional)
git clone <repository-url>
cd playwright-api-demo
make setup  # Installs dependencies and Playwright browsers
```

---

## 🔧 Essential Make Commands

### 🧪 **Local Testing**

```bash
make test                    # Run all E2E tests locally
make test-allure            # Run tests with Allure reporting
make test-accessibility     # Run WCAG accessibility tests

# BDD/Gherkin Testing
make test-bdd               # Run all BDD tests (Cucumber/Gherkin syntax)
make test-bdd-headed        # Run BDD tests in headed mode (visible browser)
make test-bdd-smoke         # Run BDD smoke tests only (@smoke tag)

# Direct Playwright Commands
npx playwright test --headed   # Run tests in headed mode (visible browser)
npx playwright test --debug    # Run tests in debug mode
```

### 🐳 **Docker Testing (Recommended)**

```bash
make docker-test-e2e        # Run E2E tests in Docker (generates Allure HTML)
make docker-test-api        # Run API server tests in Docker
make docker-test-wcag       # Run WCAG accessibility tests in Docker
make docker-test-all        # Run all test suites in Docker
```

### 📊 **Allure Reports**

```bash
# Local Allure Reports
make allure-generate        # Generate HTML report from results
make allure-serve          # Generate and auto-open report in browser
make allure-open           # Open existing HTML report

# Docker Allure Reports (with live server)
make docker-test-e2e-serve  # Run E2E tests + serve report at :9001
make docker-reports         # Start all report servers (E2E: :9001, API: :9002)
```

### 🔧 **Development & Maintenance**

```bash
make setup                  # Complete project setup
make lint                   # Run ESLint and Prettier checks
make format                 # Auto-format code with Prettier
make clean                  # Clean generated files and reinstall
make docker-clean          # Clean Docker containers and volumes
```

---

## 📊 **Accessing Test Reports**

### **Local Reports**

```bash
# After running tests locally
npx playwright show-report  # Playwright HTML report
make allure-open            # Allure HTML report (if generated)
```

---

## 🎯 **Test Suite Overview**

### 🎭 **E2E Tests**

- **Target**: Crypto.com exchange navigation and functionality
- **Browser**: Chromium (configurable for Firefox, WebKit)
- **Reports**: Playwright HTML + Allure with screenshots/videos

### 🥒 **BDD/Gherkin Tests**

- **Framework**: playwright-bdd with Cucumber/Gherkin syntax
- **Features**: Natural language test scenarios in `features/*.feature` files
- **Step Definitions**: Reuses existing fixture functions without modification
- **Tags**: `@smoke`, `@slow` for selective test execution
- **Benefits**: Enhanced readability and business-friendly test documentation

### ♿ **WCAG Accessibility Tests**

- **Standards**: WCAG 2.1 Level A, AA + WCAG 2.2 Level AAA
- **Features**: Automated modal dismissal, multi-browser support
- **Tools**: axe-core integration with detailed violation reports

### 🚀 **API Server Tests**

- **Framework**: Jest with TypeScript
- **Endpoints**: Health checks, blacklist management
- **Coverage**: Full test coverage with Allure reporting

---

## 🥒 **BDD/Gherkin Testing**

### **Overview**

The project includes comprehensive BDD (Behavior-Driven Development) testing using Cucumber/Gherkin syntax, powered by `playwright-bdd`. This provides natural language test scenarios that are readable by both technical and non-technical stakeholders.

### **Quick Start**

```bash
# Run all BDD tests
make test-bdd

# Run BDD tests in headed mode (visible browser)
make test-bdd-headed

# Run smoke tests only
make test-bdd-smoke

# Run with specific tags
make test-bdd TAG=@slow
```

### **BDD Commands**

| Command                  | Description                        | Example                   |
| ------------------------ | ---------------------------------- | ------------------------- |
| `make test-bdd`          | Run all BDD scenarios              | All feature tests         |
| `make test-bdd-headed`   | Run BDD tests with visible browser | Debugging scenarios       |
| `make test-bdd-smoke`    | Run smoke tests only               | Quick validation          |
| `make test-bdd TAG=@tag` | Run tests with specific tag        | `make test-bdd TAG=@slow` |

### **Feature Files Structure**

```
features/
├── crypto-navigation.feature     # Gherkin scenarios
├── fixtures/
│   └── bdd-fixtures.ts          # BDD-compatible fixtures
└── step-definitions/
    └── navigation-steps.ts      # Step implementations
```

### **Sample BDD Scenario**

```gherkin
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
```

### **Available Tags**

- `@smoke` - Critical functionality tests (quick execution)
- `@slow` - Comprehensive tests that may take longer
- `@regression` - Full regression testing scenarios

### **BDD Benefits**

- ✅ **Natural Language**: Tests written in plain English
- ✅ **Business Readable**: Non-technical stakeholders can understand tests
- ✅ **Reuses Fixtures**: All existing fixture functions preserved without modification
- ✅ **Selective Execution**: Run specific scenarios using tags
- ✅ **Enhanced Reporting**: Clear scenario descriptions in reports

---

## 🐳 **Docker Architecture**

### **Separated Test Suites**

| Service        | Image                      | Purpose                   | Report Port |
| -------------- | -------------------------- | ------------------------- | ----------- |
| **e2e-tests**  | `playwright:v1.48.0-focal` | E2E functionality testing | :9001       |
| **api-tests**  | `node:22-alpine`           | API server testing        | :9002       |
| **wcag-tests** | `playwright:v1.48.0-focal` | Accessibility compliance  | -           |

### **Docker Benefits**

- ✅ **Consistent Environment**: Same runtime across all machines
- ✅ **Automatic Report Generation**: HTML reports generated in containers
- ✅ **Live Report Servers**: Nginx servers for interactive report viewing
- ✅ **Complete Isolation**: Independent test suites with separate volumes

---

## 📁 **Project Structure**

```
playwright-api-demo/
├── tests/                   # E2E and accessibility test files
├── features/                # BDD/Gherkin feature files and step definitions
│   ├── *.feature           # Gherkin scenarios in natural language
│   ├── fixtures/            # BDD-compatible fixture implementations
│   └── step-definitions/    # Step definition mappings
├── src/                     # Mock API server (Express.js)
├── docker/                  # Separated Dockerfiles for each test suite
├── playwright.config.ts     # Main Playwright configuration
├── playwright-bdd.config.ts # BDD-specific Playwright configuration
├── playwright.accessibility.config.ts  # WCAG testing configuration
├── Makefile                 # Essential commands and workflows
└── docker-compose.yml       # Multi-service Docker orchestration
```

---

## 🛠️ **Configuration**

Create `.env` file for custom settings:

```bash
BASE_URL=https://crypto.com/exchange/trade/BTC_USD
TEST_TIMEOUT=30000
HEADLESS=true
```

---

## 📚 **Key Features**

- 🎯 **Multi-Browser Testing**: Chromium, Firefox, WebKit support
- ♿ **WCAG Compliance**: Comprehensive accessibility testing
- 📊 **Rich Reporting**: Interactive Allure reports with trends and attachments
- 🐳 **Docker Ready**: Containerized testing with isolated environments
- 🔧 **TypeScript**: Full type safety with strict configuration
- 🚀 **CI/CD Integration**: GitHub Actions with artifact management

---

## 📄 **License**

MIT License - see [LICENSE](LICENSE) file for details.
