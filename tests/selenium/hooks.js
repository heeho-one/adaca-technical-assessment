const path = require('path');
const fs = require('fs');
const { createWebDriver } = require('../../core/selenium/webDriverFactory');
const { setDriver } = require('../../core/selenium/webDriverManager');

let driver;
let results = [];

exports.mochaHooks = {
    async beforeEach() {
        driver = await createWebDriver();
        setDriver(driver);
    },

    async afterEach() {
        results.push({ 
            title: this.currentTest?.title, 
            state: this.currentTest?.state 
        });

        if (this.currentTest?.state === 'failed') {
            const screenshot = await driver.takeScreenshot();
            const fileName = this.currentTest.title.replace(/\s+/g, '_') + '.png';
            const screenshotsDir = path.join(__dirname, '../screenshots');

            if (!fs.existsSync(screenshotsDir)) {
                fs.mkdirSync(screenshotsDir);
            }

            const filePath = path.join(screenshotsDir, fileName);
            fs.writeFileSync(filePath, screenshot, 'base64');
            console.log(`Screenshot saved: ${filePath}`);
        }

        if (driver) {
            driver.close();
            driver.quit();
        }
    },

    async afterAll() {
        console.log('\nTest Summary:');
        results.forEach(({ title, state }) => {
            console.log(`[${state.toUpperCase()}] ${title}`)
        });
    }
}