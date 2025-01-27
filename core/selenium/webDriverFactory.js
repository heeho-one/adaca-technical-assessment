const { Builder } = require('selenium-webdriver');

async function createWebDriver(browser = 'chrome') {
    const driver = await new Builder().forBrowser(browser).build();

    return driver;
}

module.exports = { createWebDriver };