import { BaseStore, helper } from 'odux'

interface TodoStoreType {
    [id: string]: Models.Todo
}
@helper.registerStore()
export class TodoStore extends BaseStore<TodoStoreType> {

}
