import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { ENTER_KEY, ESC_KEY } from '../../constants'
import { INTEGER } from '../../../../../src/healthStorage'

export class TodoEntry extends React.PureComponent {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor (props) {
    super(props)

    this.onDelete = this.onDelete.bind(this)
    this.onToggle = this.onToggle.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onHandleEdit = this.onHandleEdit.bind(this)
    this.onClearEdit = this.onClearEdit.bind(this)
    this.onLock = this.onLock.bind(this)
    this.onUnlock = this.onUnlock.bind(this)

    this.editText = this.props.todo.title
  }

  /**
   * Delete todo
   */
  onDelete () {
    this.props.onDelete && this.props.onDelete(this.props.todo)
  }

  /**
   * Lock todo
   */
  onLock () {
    this.props.onLock && this.props.onLock(this.props.todo)
  }

  /**
   * Lock todo
   */
  onUnlock () {
    this.props.onUnlock && this.props.onUnlock(this.props.todo)
  }

  /**
   * Toggle state
   */
  onToggle () {
    this.props.onToggle && this.props.onToggle(this.props.todo)
  }

  /**
   * Handle edit
   */
  onHandleEdit () {
    this.onHandleEdit && this.props.onHandleEdit(this.props.todo)
  }

  /**
   * Handle edit
   */
  onClearEdit () {
    this.onClearEdit && this.props.onClearEdit(this.props.todo)
  }

  /**
   * Handle edit
   */
  onEdit (e) {
    if (e.which === ESC_KEY) {
      this.editText = this.props.todo.title
      this.props.onHandleEdit('')
    }
    if (e.which === ENTER_KEY) {
      this.props.todo.title = this.editText
      this.onEdit && this.props.onEdit(this.props.todo)
    }
  }

  /**
   * Change edit text
   * @param {Event} e
   */
  onChangeTitle (e) {
    this.editText = e.target.value
  }

  /**
   * Check if editing is on and focus node
   * @param {Object} prevProps
   */
  componentDidUpdate (prevProps) {
    if (!prevProps.editing && this.props.editing) {
      var node = ReactDOM.findDOMNode(this.refs.editField)
      node.focus()
      node.setSelectionRange(node.value.length, node.value.length)
    }
  }

  /**
   * File download
   * @param {String} blobRef 
   */
  downloadFile(sdoId, fileRef) {
    this.props.handleFileDownload(sdoId, fileRef)
  }

  /**
   * Render View
   * @returns {Component}
   */
  render () {
    const className = classNames({ completed: this.props.todo.isCompleted === 1, editing: this.props.editing })
    var lockValueDate = this.props.todo.lockValue !== null && this.props.todo.lockValue !== undefined && this.props.todo.lockValue.requestTimestamp !== undefined ? this.props.todo.lockValue.requestTimestamp.split('T')[0] : null
    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={this.props.todo.isCompleted === 1} onChange={this.onToggle} />
          <label onDoubleClick={this.onHandleEdit}>
            {this.props.todo.title}
            {
              this.props.todo.lockValue !== null && lockValueDate !== null
                ? <small >Gesperrt am: {lockValueDate}</small>
                : ''
            }
          </label>
          {
            this.props.todo.blobRefs !== undefined && this.props.todo.blobRefs.length > 0
            ?
            this.props.todo.blobRefs.map(fileRef => {
              return <button key={fileRef} onClick={() => this.downloadFile(this.props.todo.md.id, fileRef)} className="file-btn">Datei</button>
            })
            : null
          }
          {
            this.props.todo.lockValue === null || this.props.todo.lockValue === undefined && this.props.todo.lockValue.requestTimestamp === undefined 
              ? <button className="lock-btn" onClick={this.onLock}>Lock</button>
              : <button className="lock-btn" onClick={this.onUnlock}>Unlock</button>
          }
          <button className="destroy" onClick={this.onDelete} />
        </div>
        <input ref="editField" className="edit" onBlur={this.onClearEdit} onKeyDown={this.onEdit} defaultValue={this.editText} onChange={this.onChangeTitle.bind(this)}/>
      </li>
    )
  }
}
