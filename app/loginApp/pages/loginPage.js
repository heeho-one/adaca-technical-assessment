const { By } = require('selenium-webdriver');
const { BasePage } = require("../../../core/selenium/basePage");

class LoginPage extends BasePage {
    usernameField = By.id('username');
    passwordField = By.id('password');
    loginButton = By.id('submit');
    errorMessage = By.id('error');

    constructor(driver) {
        super(driver);
    }

    async enterUsername(username) {
        const element = await this.waitForElementLocatedAt(this.usernameField);
        await element.sendKeys(username);
    }

    async enterPassword(password) {
        const element = await this.waitForElementLocatedAt(this.passwordField);
        await element.sendKeys(password);
    }

    async clickLoginButton() {
        const element = await this.waitForElementLocatedAt(this.loginButton);
        await element.click();
    }

    async getErrorMessage() {
        const element = await this.waitForElementLocatedAt(this.errorMessage);
        await this.waitForElementToBeVisible(element);
        return await element.getText();
    }
}

module.exports = { LoginPage }