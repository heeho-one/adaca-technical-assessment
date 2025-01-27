const { until } = require('selenium-webdriver');

class BasePage {

    constructor(driver) {
        this.driver = driver;
    }

    async hoverOverElement(element) {
        await this.driver.actions().move({ origin: element }).perform();
    }

    async waitForElementLocatedAt(selector, timeout=1000) {
        return await this.driver.wait(until.elementLocated(selector), timeout);
    }

    async waitForElementToBeVisible(element, timeout=1000) {
        await this.driver.wait(until.elementIsVisible(element));
    }
}

module.exports = { BasePage }