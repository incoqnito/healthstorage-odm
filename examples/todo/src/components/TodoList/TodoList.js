import React from 'react'
import uuid from 'uuid/v4'

import { TodoEntry } from '../TodoEntry/TodoEntry'

import { ENTER_KEY } from '../../constants'

export class TodoList extends React.Component {
  /**
   * Constructor
   * Define HS HsModel
   */
  constructor (props) {
    super(props)

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
      isCompleted: 0,
      lockValue: ''
    })

    Promise.resolve(maybePromise).then(() => {
      this.setState({
        value: ''
      })
    }).catch(error => {
      this.props.toggleErrorAlert(error)
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
        <section className="bulk-section">
          <div className="inner-list">
            <button onClick={this.props.bulkCompleteTodos} className="default-btn">Complete All</button>
            <button onClick={this.props.bulkOpenTodos} className="default-btn">Open All</button>
          </div>
        </section>
        <section className="upload-file">
          <div className="inner-list">
            <div>
              <input type="file" name="" id="" onChange={this.props.handleSelectedFile} />
            </div>
            <div>
              <button onClick={this.props.handleUpload}>Hochladen</button>
            </div>
          </div>
        </section>
        <header className="header">
          <h1>todos</h1>
          <div className="pos-rel">
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              onKeyDown={this.onKeyDown}
              onChange={this.onChange}
              autoFocus={true}
              value={this.state.value}
            />
            <span className="toggle-edit-file">+ Datei</span>
          </div>
        </header>
        <section className="main">
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
  renderTodo (todo) {
    return <TodoEntry
      key={todo.md.id}
      todo={todo}
      editing={this.props.editing === todo.md.id}
      onDelete={this.props.onDeleteTodo}
      onLock={this.props.onLockTodo}
      onUnlock={this.props.onUnlockTodo}
      onToggle={this.props.onToggleTodo}
      onHandleEdit={this.props.onHandleEdit}
      onClearEdit={this.props.onClearEdit}
      onEdit={this.props.onEditTodo}
      toggleErrorAlert={this.props.toggleErrorAlert}
    />
  }
}
