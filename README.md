# adaca-technical-assessment

## Setup Instructions

Prerequisites:
- NodeJS v22 is installed in your local machine

Installation:
1. Clone the repository to your local machine
2. Install dependencies
    > npm i
3. Install Playwright browsers
    > npx playwright install --with-deps

## How to run tests:

To run the tests, execute the following code in your terminal/command prompt.

### Selenium
```
npm run test.selenium
```

### Playwright
```
npm run test.playwright
```

## Structure

`core` folder contains the code for setting up the selenium webdriver as well as the utilities that can be shared between selenium and playwright

`app` folder contains the codes related to the application undet test like the page object model.

`tests` folder contains the test scripts as well as the test data files for data driven testing. This folder is also separated by the framework used to run the test `selenium` and `playwright`.

`.mocharc.json` - this file contains the config to run the selenium test.

`playwright.config.js` - this file is where playwright is configured.

### Selenium

The selenium automation framework is designed from the ground up with Page Object Model (POM) in mind. It uses Chrome as the browser of choice, Mocha as the testing framework and Chai as the assertion library.

- `test/selenium`
    - This folder contains the selenium tests that will run against the sample web application.

    - `hooks.js` - this file is where the global hooks is stored. It contains actions for building the webdriver during setup as well as the teardown actions such as saving screenshots during test failures, closing the driver properly and printing the result in the console.

### Playwright

The playwright section of the code does not divert much from the vanilla playwright template code that is generated during installation. The tests are located in the `tests/playwright` folder.

### Shared Utilities

The framework also have a automation framework agnostic utilities located in the `core/utils` folder. The codes included here can be used by both Selenium and Playwright test since it dows not have rely on said libraries to function.

- `stringUtils.ts` - contains a single function to add a timestamp to the provided string.

## Assumptions

- The framework is designed to only run in a local environment, so setting the browser as headless is deemed as low priority item.
- Chrome is the only browser used in testing. The createWebDriver function accepts a browser type string argument but is not tested with other browser due to time constraints.
- Mocha/Chai is used as the test runner and assertion library due simplicity and familiarity.
- For the method getTodoByName, it is assumed that todos always have a unique name thus in the event that 2 todos in the list have the same title, it will always return the first one it sees.
