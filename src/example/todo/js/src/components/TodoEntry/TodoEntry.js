import React from 'react'
import classNames from 'classnames'

export class TodoEntry extends React.PureComponent {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props)

    this.onDelete = this.onDelete.bind(this)
    this.onToggle = this.onToggle.bind(this)
    this.onHandleEdit = this.onHandleEdit.bind(this)
  }

  /**
   * Delete todo
   */
  onDelete() {
    this.props.onDelete && this.props.onDelete(this.props.todo)
  }

  /**
   * Toggle state
   */
  onToggle() {
    this.props.onToggle && this.props.onToggle(this.props.todo)
  }

  /**
   * Handle edit
   */
  onHandleEdit() {
    this.props.onHandleEdit(this.props.todo)
  }

  /**
   * Edit title
   */
  handleEdit() {
    
  }

  /**
   * Render View
   * @returns {Component}
   */
  render() {
    const className = classNames({ completed: this.props.todo.isCompleted, editing: this.props.editing})

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" defaultChecked={this.props.todo.isCompleted} onChange={this.onToggle} />
          <label onDoubleClick={this.handleEdit}>{this.props.todo.title}</label>
          <button className="destroy" onClick={this.onDelete} />
        </div>
        <input ref="editField" className="edit" defaultValue="Hiiii" />
      </li>
    )
  }
}
