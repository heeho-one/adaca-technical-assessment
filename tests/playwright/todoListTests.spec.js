import { test, expect } from '@playwright/test';
import { addTimeStamp } from '../../core/utils/stringUtils';

test.describe('Todo Tests', () => {
    test('User should be able to add a new todo', async ({ page }) => {
        const todo = addTimeStamp('test todo');
        const inputField = page.getByTestId('text-input')

        await page.goto('https://todomvc.com/examples/react/dist/');
        await inputField.fill(todo);
        await inputField.press('Enter');
        await expect(page.getByTestId('todo-item').last()).toHaveText(todo);
    });
});