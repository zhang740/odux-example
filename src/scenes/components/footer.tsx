import * as React from 'react'
import { Utils } from '../../data/utils'
import * as classNames from 'classnames'
import { PageStore, TodoStore } from '../../data/stores'
import { TodoActions } from '../../data/actions'
import { connect, lazyInject } from 'odux/simple'

interface ITodoFooterProps {
  activeCount?: number
  completedCount?: number
  onClearCompleted: () => void
  nowShowing: string
}
@connect<ITodoFooterProps>((ioc) => (props) => {
  const todos = ioc.get<PageStore>(PageStore).Todos.list
  const todoStore = ioc.get<TodoStore>(TodoStore).Data

  const completedCount = todos.reduce((accum, todo) => {
    return todoStore[todo.id] && todoStore[todo.id].completed ? accum + 1 : accum
  }, 0)
  return {
    ...props,
    activeCount: todos.length - completedCount,
    completedCount
  }
})
export class TodoFooter extends React.Component<ITodoFooterProps, {}> {

  public render() {
    let activeTodoWord = Utils.pluralize(this.props.activeCount, 'item')
    let clearButton = null

    if (this.props.completedCount > 0) {
      clearButton = (
        <button
          className="clear-completed"
          onClick={this.props.onClearCompleted}>
          Clear completed
        </button>
      )
    }

    const nowShowing = this.props.nowShowing
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.activeCount}</strong> {activeTodoWord} left
        </span>
        <ul className="filters">
          <li>
            <a
              href="#/"
              className={classNames({ selected: nowShowing === 'all' })}>
              All
            </a>
          </li>
          {' '}
          <li>
            <a
              href="#/active"
              className={classNames({ selected: nowShowing === 'active' })}>
              Active
            </a>
          </li>
          {' '}
          <li>
            <a
              href="#/completed"
              className={classNames({ selected: nowShowing === 'completed' })}>
              Completed
            </a>
          </li>
        </ul>
        {clearButton}
      </footer>
    )
  }
}
