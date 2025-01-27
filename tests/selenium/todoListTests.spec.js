const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const { TodoPage } = require('../../app/todoApp/pages/todoPage');
const { addTimeStamp } = require('../../core/utils/stringUtils');
const todos = require('../testData/todoList.json');
const { getDriver } = require('../../core/selenium/webDriverManager');

describe('TodoMVC Page Tests', function () {
    
    beforeEach('Create webdriver and navigate to page', async () => {
        driver = await getDriver();
        todoPage = new TodoPage(driver);

        await driver.get('https://todomvc.com/examples/react/dist/');
    });

    it('should be able to add a new todo item', async () => {
        const todoName = addTimeStamp('Sumbit Project');

        await todoPage.addNewTodo(todoName);
        let latestTodo = await todoPage.getLatestTodoText();
        expect(latestTodo).to.equal(todoName);
    });

    it('should be able to delete an existing todo item', async () => {
        const todoName = 'To be deleted'

        await todoPage.addNewTodo(todoName);
        await todoPage.deleteTodoByName(todoName);
        const todoItem = await todoPage.getTodoByName(todoName);
        expect(todoItem).to.be.null;
    });

    todos.forEach((todo) => {
        it(`should be able to add and complete a todo item ${todo}`, async () => {
            await todoPage.addNewTodo(todo);
            await todoPage.completeTodoByName(todo);
            await todoPage.getTodoStatusByName(todo);
            expect(await todoPage.getTodoStatusByName(todo)).to.be.true;
        });
    })

    it('should be able to delete an existing todo item - expected fail to demonstrate screenshot saving', async () => {
        const todoName = 'To be deleted'
        const todoName2 = 'This is the actual item deleted'

        await todoPage.addNewTodo(todoName);
        await todoPage.addNewTodo(todoName2);
        await todoPage.deleteTodoByName(todoName2);
        const todoItem = await todoPage.getTodoByName(todoName);
        expect(todoItem).to.be.null;
    });
});