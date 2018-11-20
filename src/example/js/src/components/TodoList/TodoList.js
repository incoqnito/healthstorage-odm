import React from 'react'
import uuid from 'uuid/v4'

import { TodoEntry } from '../TodoEntry/TodoEntry'

import { ENTER_KEY } from '../../constants'

export class TodoList extends React.Component {
  /**
   * Constructor
   * Define HS Model
   */
  constructor () {
    super()

    this.state = {
      value: '',
      checkedAll: false
    }

    this.renderTodo = this.renderTodo.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  /**
   * Handle input update
   * @param {Mixed} event
   */
  onChange (event) {
    this.setState({
      value: event.target.value
    })
  }

  /**
   * Add new todo
   * @param {Mixed} event
   */
  onKeyDown (event) {
    if (event.keyCode !== ENTER_KEY || event.target.value.trim() === '') {
      return false
    }

    const maybePromise = this.props.onAddTodo && this.props.onAddTodo({
      id: uuid(),
      title: event.target.value,
      isCompleted: false
    })

    Promise.resolve(maybePromise).then(() => {
      this.setState({
        value: ''
      })
    }).catch(error => {
      console.log(error);
    })
  }

  /**
   * Render View
   * @returns {Component}
   */
  render () {
    window.state = this.state

    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            autoFocus={true}
            value={this.state.value}
          />
        </header>
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" onChange={console.log} checked={this.state.checkedAll} />
          <label htmlFor="toggle-all" />
          <ul className="todo-list">
            {
              this.props.todos.map(this.renderTodo)
            }
          </ul>
        </section>
      </div>
    )
  }

  /**
   * Render todo
   * @param {String} key
   * @param {Object} todo
   */
  renderTodo (todo, key) {
    return <TodoEntry
      key={key}
      todo={todo}
      onDelete={this.props.onDeleteTodo}
      onToggle={this.props.onToggleTodo}
      onEdit={this.props.onEditTodo}
    />
  }
}