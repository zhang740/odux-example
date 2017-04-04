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

  constructor(props: TodoItemProps) {
    super(props)
    this.state = { editText: this.props.data.title }
  }

  public handleSubmit(event: React.FormEvent<HTMLInputElement>) {
    const val = this.state.editText.trim()
    if (val) {
      this.todoActions.updateTodo({
        id: this.props.data.id,
        title: val
      })
      this.setState({
        editText: val,
        editing: false,
      })
    } else {
      this.props.onDestroy()
    }
  }

  public handleEdit() {
    this.setState({
      editing: true,
      editText: this.props.data.title
    })
  }

  public handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === ESCAPE_KEY) {
      this.setState({
        editing: false,
        editText: this.props.data.title
      })
    } else if (event.keyCode === ENTER_KEY) {
      this.handleSubmit(event)
    }
  }

  public handleChange(event: React.FormEvent<HTMLInputElement>) {
    let input: any = event.target
    this.setState({ editText: input.value })
  }

  public shouldComponentUpdate(nextProps: TodoItemProps, nextState: TodoItemState) {
    return (
      nextProps.data !== this.props.data ||
      nextState.editing !== this.state.editing ||
      nextState.editText !== this.state.editText
    )
  }

  public componentDidUpdate(prevProps: TodoItemProps, prevState: TodoItemState) {
    if (!prevState.editing && this.state.editing) {
      let node = ReactDom.findDOMNode<HTMLInputElement>(this.refs['editField'])
      node.focus()
      node.setSelectionRange(node.value.length, node.value.length)
    }
  }

  public onToggle = () => {
    this.todoActions.updateTodo({
      id: this.props.data.id,
      completed: !this.props.data.completed
    })
  }

  public render() {
    return (
      <li className={classNames({
        completed: this.props.data.completed,
        editing: this.state.editing
      })}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.data.completed}
            onChange={this.onToggle}
          />
          <label onDoubleClick={e => this.handleEdit()}>
            {this.props.data.title}
          </label>
          <button className="destroy" onClick={this.props.onDestroy} />
        </div>
        <input
          ref="editField"
          className="edit"
          value={this.state.editText}
          onBlur={e => this.handleSubmit(e)}
          onChange={e => this.handleChange(e)}
          onKeyDown={e => this.handleKeyDown(e)}
        />
      </li>
    )
  }
}
