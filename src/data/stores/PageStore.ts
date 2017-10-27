import { BaseStore, helper } from 'odux'

interface PageStoreType {
    // todos: Models.TodoList
}
@helper.registerStore()
export class PageStore extends BaseStore<PageStoreType> {

    @helper.bindProperty('todos', () => ({ list: [] }))
    Todos: Models.TodoList

    // also only, not must defined in PageStoreType
    // @bindProperty()
    // Todos: Models.TodoList

    // for initialize
    // @bindProperty('Todos', () => ({ list: [] }))
    // Todos: Models.TodoList
}
