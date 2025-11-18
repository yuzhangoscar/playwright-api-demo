.PHONY: help install install-browsers test test-headed test-chromium test-firefox test-webkit test-debug report clean setup

# Default target
help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

setup: install install-browsers ## Complete setup: install dependencies and browsers

install: ## Install project dependencies
	npm install

install-browsers: ## Install Playwright browsers
	npx playwright install

test: ## Run all tests
	npm test

test-headed: ## Run tests in headed mode (visible browser)
	npx playwright test --headed

test-chromium: ## Run tests in Chromium browser only
	npx playwright test --project=chromium

test-firefox: ## Run tests in Firefox browser only
	npx playwright test --project=firefox

test-webkit: ## Run tests in WebKit browser only
	npx playwright test --project=webkit

test-debug: ## Run tests in debug mode
	npx playwright test --debug

test-ui: ## Run tests with Playwright UI mode
	npx playwright test --ui

report: ## Open test report
	npx playwright show-report

clean: ## Clean node_modules and reinstall dependencies
	rm -rf node_modules package-lock.json
	npm install

clean-reports: ## Clean test reports and artifacts
	rm -rf test-results/ playwright-report/ blob-report/

lint: ## Run ESLint on TypeScript files
	npm run lint

lint-fix: ## Run ESLint and automatically fix issues
	npm run lint:fix

format: ## Format code with Prettier
	npm run format

format-check: ## Check code formatting with Prettier
	npm run format:check

type-check: ## Run TypeScript type checking
	npm run type-check

dev: ## Start development server (if applicable)
	npm run dev

build: ## Build the project (if applicable)
	npm run build

update: ## Update Playwright browsers
	npx playwright install

trace: ## View trace files
	npx playwright show-trace

codegen: ## Generate test code using Playwright codegen
	npx playwright codegen

doctor: ## Run Playwright system requirements check
	npx playwright install --dry-run