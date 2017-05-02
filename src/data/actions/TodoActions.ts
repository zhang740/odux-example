import { BaseAction } from 'odux'
import { lazyInject, register } from '../decorators'
import { TodoStore, PageStore } from '../stores'
import { Utils } from '../utils'

@register()
export class TodoActions extends BaseAction {
    @lazyInject(TodoStore)
    private todoStore: TodoStore
    @lazyInject(PageStore)
    private pageStore: PageStore

    public addTodo(title?: string) {
        const todo: Models.Todo = {
            id: Utils.uuid(),
            title,
        }
        this.tracking(() => {
            this.pageStore.Todos.list.push({
                id: todo.id,
            })
            this.todoStore.Data[todo.id] = todo
        })
    }

    public updateTodo(newTodo: Models.Todo) {
        if (!newTodo.id) return
        this.tracking(() => {
            Object.assign(
                this.todoStore.Data[newTodo.id],
                newTodo,
            )
        })
    }

    public removeTodo(id: string) {
        this.tracking(() => {
            const tid = this.todoStore.Data[id].id
            delete this.todoStore.Data[id]
            const index = this.pageStore.Todos.list.findIndex(t => t.id === tid)
            index >= 0 && this.pageStore.Todos.list.splice(index, 1)
        })
    }

    public toggleAll(checked: boolean) {
        this.tracking(() => {
            this.pageStore.Todos.list.forEach(item => {
                this.todoStore.Data[item.id].completed = checked
            })
        })
    }

    public clearCompleted() {
        this.tracking(() => {
            this.pageStore.Data.todos.list = this.pageStore.Todos.list.filter(t => {
                return !this.todoStore.Data[t.id].completed
            })
        })
    }
}