import { BaseStore, helper } from 'odux'

interface PageStoreType {
    // is ok
    // todos: Models.TodoList
}
@helper.registerStore()
export class PageStore extends BaseStore<PageStoreType> {

    @helper.bindProperty('todos', () => ({ list: [] }))
    Todos: Models.TodoList

    // @bindProperty()
    // Todos: Models.TodoList

    // for initialize
    // @bindProperty('Todos', () => ({ list: [] }))
    // Todos: Models.TodoList
}
