import { BaseStore } from 'odux'
import { registerStore } from 'odux/simple'

interface TodoStoreType {
    [id: string]: Models.Todo
}
@registerStore()
export class TodoStore extends BaseStore<TodoStoreType> {

}