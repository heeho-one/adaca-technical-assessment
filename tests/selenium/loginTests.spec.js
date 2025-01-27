const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const { LoginPage } = require('../../app/loginApp/pages/loginPage');
const { HomePage } = require('../../app/loginApp/pages/homePage');
const loginData = require('../testData/invalidLoginCredentials.json');
const { getDriver } = require('../../core/selenium/webDriverManager');

describe('Login Page Tests', function () {
    let loginPage;
    let homePage;

    beforeEach('Create webdriver and navigate to page', async () => {
        driver = getDriver();
        loginPage = new LoginPage(driver);
        homePage = new HomePage(driver);

        await driver.get('https://practicetestautomation.com/practice-test-login/');
    });

    it('should be able to login with valid credentials', async () => {
        await loginPage.enterUsername('student');
        await loginPage.enterPassword('Password123');
        await loginPage.clickLoginButton();

        expect(await driver.getCurrentUrl()).to.contains('practicetestautomation.com/logged-in-successfully/');
        expect(await homePage.getWelcomeMessage()).to.contain('successfully logged in');
        expect(await homePage.isLogOutButtonVisible()).to.be.true;
    });

    loginData.forEach((data) => {
        it(`should show an error message when logging in using invalid credentials - ${data.scenario}`, async () => {
            await loginPage.enterUsername(data.username);
            await loginPage.enterPassword(data.password);
            await loginPage.clickLoginButton();

            expect (await loginPage.getErrorMessage()).to.equal(data.errorMessage);
        });
    });
});