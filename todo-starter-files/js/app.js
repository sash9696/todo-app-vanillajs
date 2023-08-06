import { insertHTML } from "./helpers.js";
import { TodoStore } from "./store.js"


const Todos = new TodoStore("todo-vanillajs");

console.log(Todos)
const App = {
    $: {
        input: document.querySelector('[data-todo="new"]'),
        clear: document.querySelector('[data-todo="clear-completed"]'),
        list: document.querySelector('[data-todo="list"]')
    },
    init() {
        //initialising our app
        Todos.addEventListener("save", App.render)
        App.$.input.addEventListener('keyup', function (e) {
            if (e.key === "Enter" && e.target.value.length) {
                console.log(e.key)
                //add todo
                Todos.add({
                    title: e.target.value,
                    completed: false,
                    id: "id_" + Date.now()
                })

                App.$.input.value = "";
            }


        })
        App.render()
    },

    createTodo(todo) {
        const li = document.createElement('li');
        li.dataset.id = todo.id;

        if (todo.completed) {
            li.classList.add("completed")
        }
        insertHTML(li, `

        <div class="view">
            <input data-todo="toggle" class="toggle" type="checkbox" ${todo.completed ? "checked" : ""} />
            <label data-todo="label"></label>
            <button class="destroy" data-todo="destroy"></button>
        </div>
        <input class="edit" data-todo="edit"/>
        `)

        li.querySelector('[data-todo="label"]').textContent = todo.title;
        // li.querySelector('[data-todo="edit"]').value = todo.title;
        return li

    },

    render() {
        console.log(Todos.all())
        App.$.list.replaceChildren(...Todos.all('abcde').map((todo) => App.createTodo(todo)))
    }
}

App.init()
