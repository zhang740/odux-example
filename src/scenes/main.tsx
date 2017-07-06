import 'todomvc-common/base.css'
import 'todomvc-app-css/index.css'

import * as React from 'react'
import * as ReactDom from 'react-dom'

import { TodoFooter } from './components/footer'
import { TodoItem } from './components/todoItem'
import { ENTER_KEY } from '../data/models/constants'

import { Router } from 'director/build/director'

import { PageStore, TodoStore } from '../data/stores'
import { TodoActions } from '../data/actions'
import { connect, lazyInject } from 'odux/simple'

interface AppProps {
  todos?: Models.TodoList
  todoStore?: { [id: string]: Models.Todo }
}
interface AppState {
  editing?: string
  nowShowing?: Models.TodoStatus
}
@connect<AppProps>((ioc) => (props) => {
  return {
    todos: ioc.get<PageStore>(PageStore).Todos,
    todoStore: ioc.get<TodoStore>(TodoStore).Data,
  }
})
export class TodoApp extends React.Component<AppProps, AppState> {

  @lazyInject(TodoActions)
  private todoActions: TodoActions

  constructor(props: AppProps) {
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
    let footer
    let main
    const todos = this.props.todos

    const shownTodos = todos.list.filter((todo) => {
      if (!this.props.todoStore[todo.id]) {
        return false
      }
      switch (this.state.nowShowing) {
        case 'active':
          return !this.props.todoStore[todo.id].completed
        case 'completed':
          return this.props.todoStore[todo.id].completed
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
      return !this.props.todoStore[todo.id] || this.props.todoStore[todo.id].completed ? accum : accum + 1
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