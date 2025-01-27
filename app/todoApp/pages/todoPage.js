const { By, Key, until } = require('selenium-webdriver');
const { BasePage } = require("../../../core/selenium/basePage");

class TodoPage extends BasePage {
    newTodoInput = By.css('input[data-testid="text-input"]');
    todoItems = By.css('li[data-testid="todo-item"]');
    todoName = By.css('[data-testid="todo-item-label"]');
    deleteButton = By.className('destroy');
    todoItemToggle = By.css('[data-testid="todo-item-toggle"]');

    constructor(driver) {
        super(driver);
    }

    async addNewTodo(todoName) {
        const inputElement = await this.waitForElementLocatedAt(this.newTodoInput);
        await inputElement.sendKeys(todoName, Key.ENTER);
    }

    async getTodos() {
        return await this.driver.findElements(this.todoItems);
    }

    async getTodoByName(todoName) {
        const todos = await this.getTodos();

        for (const todo of todos) {
            const label = await todo.findElement(this.todoName);
            const labelText = await label.getText();

            if (labelText.trim() === todoName) {
                return todo;
            }
        }

        return null;
    }

    async completeTodoByName(todoName) {
        const todo = await this.getTodoByName(todoName);

        if (!todo) {
            throw new Error(`Todo with name ${todoName} does not exist.`);
        }

        const completeToggle = await todo.findElement(this.todoItemToggle);
        await completeToggle.click();
    }

    async deleteTodoByName(todoName) {
        const todo = await this.getTodoByName(todoName);

        if (!todo) {
            throw new Error(`Todo with name ${todoName} does not exist.`);
        }

        await this.hoverOverElement(todo);
        const deleteButton = await todo.findElement(this.deleteButton);
        await this.waitForElementToBeVisible(deleteButton);
        await deleteButton.click();
    }

    async getTodoStatusByName(todoName) {
        const todo = await this.getTodoByName(todoName);

        if (!todo) {
            throw new Error(`Todo with name ${todoName} does not exist.`);
        }

        return await todo.getAttribute('class') === 'completed' ? true : false;
    }

    async getLatestTodo() {
        const todos = await this.driver.findElements(this.todoItems);

        if (todos.length > 0) {
            return todos.at(-1);
        }

        return null;
    }

    async getLatestTodoText() {
        const todoItem = await this.getLatestTodo();

        if (!todoItem) {
            throw new Error(`There is no existing todo item on the list.`);
        }

        return await todoItem.findElement(this.todoName).getText();
    }
}

module.exports = { TodoPage }