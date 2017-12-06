import 'todomvc-common/base.css'
import 'todomvc-app-css/index.css'

import * as React from 'react'
import * as ReactDom from 'react-dom'

import TodoFooter from './components/footer'
import TodoItem from './components/todoItem'
import { ENTER_KEY } from '../data/models/constants'

import { Router } from 'director/build/director'

import { PageStore, TodoStore } from '../data/stores'
import { TodoActions } from '../data/actions'
import { helper } from 'odux'

interface PropsType {
}
interface StateType {
    editing?: string
    nowShowing?: Models.TodoStatus
}

export default helper.component(
    (ioc, ownProps: PropsType) => ({
        todos: ioc.get<PageStore>(PageStore).Todos,
        todoStore: ioc.get<TodoStore>(TodoStore).Data,
    }),
    (MapperType, ioc) => {
        type MixPropsType = PropsType & typeof MapperType
        class TodoApp extends React.PureComponent<MixPropsType, StateType> {

            @helper.inject()
            private todoActions: TodoActions

            constructor(props: MixPropsType) {
                super(props)
                this.state = {
                    nowShowing: 'all',
                    editing: null
                }
            }

            public componentDidMount() {
                const setState = this.setState
                const router = Router({
                    '/': setState.bind(this, { nowShowing: 'all' }),
                    '/active': setState.bind(this, { nowShowing: 'active' }),
                    '/completed': setState.bind(this, { nowShowing: 'completed' })
                })
                router.init('/')
            }

            public handleNewTodoKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
                if (event.keyCode !== ENTER_KEY) {
                    return
                }

                event.preventDefault()

                const val = ReactDom.findDOMNode<HTMLInputElement>(this.refs['newField']).value.trim()

                if (val) {
                    this.todoActions.addTodo(val)
                    ReactDom.findDOMNode<HTMLInputElement>(this.refs['newField']).value = ''
                }
            }

            public toggleAll(event: React.FormEvent<HTMLInputElement>) {
                const target: any = event.target
                const checked = target.checked
                this.todoActions.toggleAll(checked)
            }

            clearCompleted = () => {
                this.todoActions.clearCompleted()
            }

            destroy(id: string) {
                this.todoActions.removeTodo(id)
            }

            public render() {
                let main
                let footer
                const { todos, todoStore } = this.props
                console.log('render main')

                const shownTodos = todos.list.filter((todo) => {
                    if (!todoStore[todo.id]) {
                        return false
                    }
                    switch (this.state.nowShowing) {
                        case 'active':
                            return !todoStore[todo.id].completed
                        case 'completed':
                            return todoStore[todo.id].completed
                        default:
                            return true
                    }
                })

                const todoItems = shownTodos.map((todo) => {
                    return (
                        <TodoItem
                            key={todo.id}
                            id={todo.id}
                            onDestroy={this.destroy.bind(this, todo.id)}
                        />
                    )
                })


                if (todos.list.length > 0) {
                    footer =
                        <TodoFooter
                            nowShowing={this.state.nowShowing}
                            onClearCompleted={this.clearCompleted}
                        />
                }

                const activedCount = todos.list.reduce((accum, todo) => {
                    return !todoStore[todo.id] || todoStore[todo.id].completed ? accum : accum + 1
                }, 0)
                if (todos.list.length > 0) {
                    main = (
                        <section className="main">
                            <input
                                className="toggle-all"
                                type="checkbox"
                                onChange={e => this.toggleAll(e)}
                                checked={activedCount === 0}
                            />
                            <ul className="todo-list">
                                {todoItems}
                            </ul>
                        </section>
                    )
                }

                return (
                    <div>
                        <header className="header">
                            <h1>todos</h1>
                            <input
                                ref="newField"
                                className="new-todo"
                                placeholder="What needs to be done?"
                                onKeyDown={e => this.handleNewTodoKeyDown(e)}
                                autoFocus={true}
                            />
                        </header>
                        {main}
                        {footer}
                    </div>
                )
            }
        }
        return TodoApp
    }
)
