const { By, until } = require('selenium-webdriver');
const { BasePage } = require("../../../core/selenium/basePage");

class HomePage extends BasePage {
    welcomeMessage = By.css('.post-content > p');
    logOutButton = By.xpath('//a[text()="Log out"]');

    constructor(driver) {
        super(driver);
    }

    async isLogOutButtonVisible() {
        const element = await this.waitForElementLocatedAt(this.logOutButton); 
        return element.isDisplayed();
    }

    async getWelcomeMessage() {
        const element = await this.waitForElementLocatedAt(this.welcomeMessage); 
        return await element.getText();
    }
}

module.exports = { HomePage }