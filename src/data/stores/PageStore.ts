import { BaseStore } from 'odux'
import { registerStore } from '../decorators'

interface PageStoreType {
    todos: Models.TodoList
}
@registerStore()
export class PageStore extends BaseStore<PageStoreType> {
    get Todos() {
        if (!this.Data.todos) {
            this.Adapter.directWriteChange(() => {
                this.Data.todos = {
                    list: []
                }
            })
        }
        return this.Data.todos
    }
}