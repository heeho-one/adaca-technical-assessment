import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
    test('User should be able to login using valid credentials', async ({ page }) => {
        await page.goto('https://practicetestautomation.com/practice-test-login/');

        await page.locator('#username').fill('student');
        await page.locator('#password').fill('Password123');
        await page.locator('#submit').click();

        await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
        await expect(page.locator('.post-content strong')).toContainText('successfully logged in');
        await expect(page.locator('a', { hasText: 'Log out' })).toBeVisible();
    });
});
