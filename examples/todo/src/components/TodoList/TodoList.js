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
        {
          this.props.showFileupload && 
          <section className="upload-file">
            <div className="inner-list">
              <div>
                <label className="d-block mb-10">Wähle eine Datai aus</label>
                <input type="file" name="" id="" onChange={this.props.handleSelectedFile} />
              </div>
            </div>
          </section>
        }
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
            <span className="toggle-edit-file" onClick={this.props.onToggleFileupload}>+ Datei</span>
          </div>
        </header>
        <section className="main">
          <ul className="todo-list">
            {
              this.props.todos.map(this.renderTodo)
            }
          </ul>
        </section>
        {
          this.props.archive.length > 0 && 
          <div className="fixed-revisions">
              <h3>
                Revisionen
                <span onClick={this.props.closeRevisions} className="close-revisions"></span>
              </h3>
              <hr></hr>
              <ul className="revisions-list">
              {
                this.props.archive.map(revision => {
                  return (
                    <li>
                      <span className="d-block"><b>Revision: </b>{revision.md.r}</span>
                      <p className="d-block">
                        <span className="d-block">ID: {revision.md.id}</span>
                        <span className="d-block">Titel: {revision.title}</span>
                        <span className="d-block">Status: {revision.isCompleted == 1 ? "Abgeschlossen" : "Offen"}</span>
                      </p>
                    </li>
                  )
                })
              }
              </ul>
          </div>
        }
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
      handleFileDownload={this.props.handleFileDownload}
      onShowRevisions={this.props.onShowRevisions}
    />
  }
}
