import { helper } from 'odux'
import { TodoStore, PageStore } from '../stores'
import { Utils } from '../utils'

@helper.register()
export class TodoActions {
    @helper.inject(TodoStore)
    private todoStore: TodoStore
    @helper.inject(PageStore)
    private pageStore: PageStore

    @helper.tracking()
    public addTodo(title?: string) {
        const todo: Models.Todo = {
            id: Utils.uuid(),
            title,
        }
        this.pageStore.Todos.list.push({
            id: todo.id,
        })
        this.todoStore.Data[todo.id] = todo
    }

    @helper.tracking()
    public updateTodo(newTodo: Models.Todo) {
        if (!newTodo.id) return
        Object.assign(
            this.todoStore.Data[newTodo.id],
            newTodo,
        )
    }

    @helper.tracking()
    public removeTodo(id: string) {
        const tid = this.todoStore.Data[id].id
        delete this.todoStore.Data[id]
        const index = this.pageStore.Todos.list.findIndex(t => t.id === tid)
        index >= 0 && this.pageStore.Todos.list.splice(index, 1)
    }

    @helper.tracking()
    public toggleAll(checked: boolean) {
        this.pageStore.Todos.list.forEach(item => {
            this.todoStore.Data[item.id].completed = checked
        })
    }

    @helper.tracking()
    public clearCompleted() {
        this.pageStore.Todos.list = this.pageStore.Todos.list.filter(t => {
            return !this.todoStore.Data[t.id].completed
        })
    }
}
