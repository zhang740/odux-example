import { BaseStore, bindProperty } from 'odux'
import { registerStore } from 'odux/simple'

interface PageStoreType {
    todos: Models.TodoList
}
@registerStore()
export class PageStore extends BaseStore<PageStoreType> {

    @bindProperty('todos', () => ({ list: [] }))
    Todos: Models.TodoList

    // also only, not must defined in PageStoreType
    // @bindProperty()
    // Todos: Models.TodoList

    // for initialize
    // @bindProperty('Todos', () => ({ list: [] }))
    // Todos: Models.TodoList
}