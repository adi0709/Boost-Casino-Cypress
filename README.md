# Cypress Cucumber Test Automation for BoostCasino Platform

This repository contains a Cypress-based test automation framework for executing end-to-end tests written in Gherkin
syntax (Cucumber). The framework utilizes the **cypress-cucumber-preprocessor** for parsing `.feature` files, *
*multiple-cucumber-html-reporter** and **@mmisty/cypress-allure-adapter** for generating HTML reports.

## Assumptions

- The user is assumed to be logged out by default when running the tests.
- The website loads successfully without interruptions, and all elements are available for interaction.
- The game "Book of Dead" is available for search and play.
- The language switching functionality works for the languages: Finnish (FI), Estonian (EE), and Russian (RU).

## Project Structure

The project is organized as follows:

```
.
├── cypress
│   ├── e2e
│   │   └── Tests
│   │       ├── Features        # Gherkin .feature files for BDD tests
│   │       └── StepDefinitions # Step definition files for Cucumber
├── support
│   ├── POM           # Page Object Model (POM) files
│   ├── Reporter      # Folder containing report generation scripts
│   │   └── report.js # Custom reporter for generating HTML reports
│   └── settingsCookie.js # File to handle GDPR consent/cookies
├── package.json      # NPM package configuration
├── cypress.config.js # Cypress configurations

```

## Prerequisites

Make sure you have the following installed on your system:

- Node.js (v16 or later)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/adi0709/Boost-Casino-Cypress.git
cd Boost-Casino-Cypress
```

2. Install dependencies:

```bash
npm install
 ```

## Executing Tests

1. **You can run the Cypress tests locally and generate multiple-cucumber-html-reporter using the following NPM script:
   **

```bash
npm run cy:testReport
```

## What it does:

- Runs the Cypress tests: The tests will be executed in Chrome using the .feature files located under
  cypress/e2e/Tests/Features.
- Generates the HTML report: After the tests are complete, a detailed HTML report will be generated using the
  multiple-cucumber-html-reporter and saved in the cucumber-report folder.
- Opens the report automatically: The report will be opened in your default web browser automatically.

2. **You can run the Cypress tests locally and generate allure report using the following NPM script:**

```bash
npm run cy:testReport
```

## What it does:

- Runs the Cypress tests: The tests will be executed in Chrome using the .feature files located under
  cypress/e2e/Tests/Features.
- Generates the HTML report: After the tests are complete, a detailed HTML report will be generated using the
  @mmisty/cypress-allure-adapter and saved in the allure-results folder.
- Opens the report automatically: The report will be opened in your default web browser automatically.

## Folder Structure Explained

- `cypress/e2e/Tests/Features/`: This folder contains all the .feature files written in Gherkin syntax. These files
  define the behavior and scenarios for the tests.
- `cypress/e2e/Tests/StepDefinitions/`: This folder contains the step definitions that map the steps in the .feature
  files to actual Cypress commands.
- `support/POM/`: The Page Object Model (POM) files are used to define the structure and actions of web pages to make
  the tests more maintainable.
- `support/Reporter/report.js`: This custom reporter generates the HTML report after tests are run. The report uses the
  multiple-cucumber-html-reporter to provide a detailed view of the test results.
- `support/settingsCookie.js`: This file handles cookies and consent for testing, ensuring that tests are compliant with
  cookie consent requirements.

## Difficulties Encountered

- **Lack of Distinct Selectors**: Not all the components had `cy-data` attributes or distinct tags, which made it
  challenging to select elements reliably. This required extra effort in locating elements with more generic selectors
  or using CSS classes/IDs, which are prone to change.

- **Testing iframes**: Testing and interacting with iframes presented challenges due to restrictions in Cypress when
  dealing with cross-origin frames.

- **GitHub Actions 403 Error**: Initially, I added GitHub Actions to the repository to automate the tests on every push.
  However, for some reason, the site returned a `403 Forbidden` error when the tests were triggered. This was likely due
  to access restrictions or authentication requirements for the website during CI execution.

- **Docker Container Issues**: While trying to add a Dockerfile to the repository, I encountered issues where the first
  tests, particularly those involving iframe assertions, kept failing when executed inside the Docker container. The
  cause of the failure was not immediately clear, but it seemed related to environment-specific configurations or
  network settings within the container.