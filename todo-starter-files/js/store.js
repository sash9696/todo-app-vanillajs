

export const TodoStore = class extends EventTarget {
    constructor(localStorageKey) {
        //properties
        super();
        this.localStorageKey = localStorageKey;
        this._readStorage();

        // window.addEventListener('storage', () => {
        //     this._readStorage();
        //     this._save();
        // })

        //getter methods
        this.get = (id) => this.todos.find((todo) => todo.id === id);

        this.all = (filter) => {
            console.log('filter', filter, this.todos)

            let todos = filter === 'active'
                ? this.todos.filter((todo) => !todo.completed)
                : filter === 'completed'
                    ? this.todos.filter((todo) => todo.completed)
                    : this.todos;
            return todos



        }
    }

    _readStorage() {
        this.todos = JSON.parse(window.localStorage.getItem(this.localStorageKey)) || [];
        // console.log('this.todos', this.todos)
    }

    _save() {
        window.localStorage.setItem(this.localStorageKey, JSON.stringify(this.todos));
        this.dispatchEvent(new CustomEvent('save'))
    }
    //methods for mutation


    add(todo) {
        console.log('todo', todo)
        this.todos.push({
            title: todo.title,
            completed: false,
            id: "id_" + Date.now()
        })
        //save the todo to local storage
        this._save();
    }
}