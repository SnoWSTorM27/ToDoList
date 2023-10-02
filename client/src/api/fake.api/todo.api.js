const todos = [
    {
        id: "1",
        title: "Позавтракать",
        completed: true
    },
    {
        id: "2",
        title: "Пойти на тренировку",
        completed: true
    },
    {
        id: "3",
        title: "Поработать",
        completed: true
    },
    {
        id: "4",
        title: "Пообедать",
        completed: false
    },
    {
        id: "5",
        title: "Прогуляться",
        completed: false
    }
];
const STORAGE_KEY = "todos_of_one_day";
const todosLS = JSON.parse(localStorage.getItem(STORAGE_KEY));
if (!localStorage.getItem(STORAGE_KEY) || todosLS.length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
const fetchAll = () =>
    new Promise((resolve) => {
        const todos = JSON.parse(localStorage.getItem(STORAGE_KEY));
        window.setTimeout(function () {
            resolve(todos);
        }, 500);
    });

const updateTodo = (id, data) =>
    new Promise((resolve) => {
        const todos = JSON.parse(localStorage.getItem(STORAGE_KEY));
        const todoIndex = todos.findIndex((td) => td.id === id);
        todos[todoIndex] = { ...todos[todoIndex], ...data };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        resolve(todos[todoIndex]);
    });

const getTododById = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(
                JSON.parse(localStorage.getItem(STORAGE_KEY)).find(
                    (todo) => todo.id === id
                )
            );
        }, 400);
    });
const addTodo = (data) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            const todos = JSON.parse(localStorage.getItem(STORAGE_KEY));
            const newTodo = {
                ...data
            };
            todos.push(newTodo);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
            resolve(newTodo);
        }, 400);
    });

const removeTodo = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            const todos = JSON.parse(localStorage.getItem(STORAGE_KEY));
            const newTodos = todos.filter((td) => td.id !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
            resolve(id);
        }, 200);
    });
export default {
    fetchAll,
    updateTodo,
    getTododById,
    addTodo,
    removeTodo
};
