import { BaseStore } from 'odux'
import { registerStore } from '../decorators'

interface TodoStoreType {
    [id: string]: Models.Todo
}
@registerStore()
export class TodoStore extends BaseStore<TodoStoreType> {

}