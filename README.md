# odux-example

odux's example - Todolist. [https://zhang740.github.io/odux-example/](https://zhang740.github.io/odux-example/)

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

### Component
```tsx
import * as React from 'react';
import { helper } from 'odux';

export interface PropsType { }

export interface StateType { }

export default helper.component(
    (ioc, ownProps: PropsType) => ({
        todos: ioc.get<PageStore>(PageStore).Todos,
    }),
    (MapperType, ioc) => {
        type MixPropsType = PropsType & typeof MapperType;
        class ComponentName extends React.PureComponent<MixPropsType, StateType> {
            render() {
                const { todos } = this.props;
                return (
                    <div>
                        component
                    </div>
                );
            }
        };
        return ComponentName;
    }
);
```

### Data
```ts
import { BaseStore, helper } from 'odux'

interface PageStoreType {
}
@helper.registerStore()
export class PageStore extends BaseStore<PageStoreType> {

    @helper.bindProperty('todos', () => ({ list: [] }))
    Todos: Models.TodoList
}
```

### Action
```ts
import { helper } from 'odux'
import { TodoStore, PageStore } from '../stores'

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
    ...
}

```

## Some use to library
### [odux](https://github.com/zhang740/odux)
An attempt to observable redux.

### [power-di](https://github.com/zhang740/power-di)
A lightweight Dependency Injection library.

### [TodoMVC](https://github.com/tastejs/todomvc)
The template of the page.
