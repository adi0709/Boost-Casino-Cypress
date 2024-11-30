# Cypress Cucumber Test Automation for BoostCasino Platform

This repository contains a Cypress-based test automation framework for executing end-to-end tests written in Gherkin
syntax (Cucumber). The framework utilizes the **cypress-cucumber-preprocessor** for parsing `.feature` files, *
*multiple-cucumber-html-reporter** for generating HTML reports.

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

You can run the Cypress tests locally using the following NPM script:

```bash
npm run cy:testReport
```

## What it does:

- Runs the Cypress tests: The tests will be executed in Chrome using the .feature files located under
  cypress/e2e/Tests/Features.
- Generates the HTML report: After the tests are complete, a detailed HTML report will be generated using the
  multiple-cucumber-html-reporter and saved in the cucumber-report folder.
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