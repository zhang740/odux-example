# odux-example

odux's example - Todolist.

## Directory Structure
- assets
- components (business logic common components, depend data, independent of app)
- data (business logic, independent of app)
    - actions
    - events
    - models
    - stores (only logic definition)
    - utils
- scenes (app's pages, using data/common components)
    - */components (page's components)
- store (configuration for store)

## Quickstart
```shell
npm run dev
```
open browser: [http://localhost:8052](http://localhost:8052)

## Quickview

### Model
```ts
// src/data/models/base.d.ts
declare namespace Models {
  interface Todo {
    id: string
    completed?: boolean
    title?: string
  }

  type TodoStatus = 'all' | 'active' | 'completed'

  interface TodoList {
    list: {
      id: string
    }[]
  }
}
```

### Store
```ts
// src/data/stores/TodoStore.ts
import { BaseStore } from 'odux'
import { registerStore } from '../decorators'

interface TodoStoreType {
    [id: string]: Models.Todo
}
@registerStore()
export class TodoStore extends BaseStore<TodoStoreType> {

}
```

### Action
```ts
// src/data/actions/TodoActions.ts
import { BaseAction } from 'odux'
import { lazyInject, register } from '../decorators'
import { TodoStore, PageStore } from '../stores'
import { Utils } from '../utils'

@register()
export class TodoActions extends BaseAction {
    @lazyInject(TodoStore)
    private todoStore: TodoStore
    ...

    public updateTodo(newTodo: Models.Todo) {
        if (!newTodo.id) return
        this.tracking(() => {
            Object.assign(
                this.todoStore.Data[newTodo.id],
                newTodo,
            )
        }, [this.todoStore])
    }

    ...
}
```

### Use in components
```ts
// src/scenes/components/todoItem.ts
import * as React from 'react'
import * as ReactDom from 'react-dom'
import * as classNames from 'classnames'

import { ENTER_KEY, ESCAPE_KEY } from '../../data/models/constants'
import { TodoStore } from '../../data/stores'
import { TodoActions } from '../../data/actions'
import { lazyInject } from '../../data/decorators'
import { connect } from '../../data/decorators'

interface TodoItemProps {
  id: string
  data?: Models.Todo
  onDestroy: () => void
}
interface TodoItemState {
  editing?: boolean
  editText?: string
}
@connect<TodoItemProps>((ioc) => (props) => {
  return {
    ...props,
    data: ioc.get<TodoStore>(TodoStore).Data[props.id]
  }
})
export class TodoItem extends React.Component<TodoItemProps, TodoItemState> {

  @lazyInject(TodoActions)
  private todoActions: TodoActions
  
  ...

}
```

## Some use to library
### odux
An attempt to observable redux.

### [power-di](https://github.com/zhang740/power-di)
A lightweight Dependency Injection library.

### [TodoMVC](https://github.com/tastejs/todomvc)
The template of the page.