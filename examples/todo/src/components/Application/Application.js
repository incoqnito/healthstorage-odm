import React from 'react'

import { Todo } from '../../models'

import { TodoList } from '../TodoList/TodoList'

import { ErrorAlert } from '../Alert/ErrorAlert'

import { FilterSort } from '../FilterSort/FilterSort'

import { Pagination } from '../Pagination/Pagination'

const MIME = require('mime-types')

const EXTRA_MIMES = {
  'application/x-iwork-numbers-sffnumbers': 'numbers',
  'application/x-rar': "rar"
}

export class Application extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      orderBy: Todo.MD_DATE,
      orderByDirection: Todo.DESC,
      error: undefined,
      editing: '',
      startDate: new Date(),
      endDate: new Date('2019-12-31'),
      pageSize: '',
      selectedFile: false,
      showFileupload: false,
      archive: []
    }

    this.onAddTodo = this.onAddTodo.bind(this)
    this.onToggleTodo = this.onToggleTodo.bind(this)
    this.onEditTodo = this.onEditTodo.bind(this)
    this.onDeleteTodo = this.onDeleteTodo.bind(this)
    this.onLockTodo = this.onLockTodo.bind(this)
    this.onUnlockTodo = this.onUnlockTodo.bind(this)
    this.bulkCompleteTodos = this.bulkCompleteTodos.bind(this)
    this.bulkOpenTodos = this.bulkOpenTodos.bind(this)

    this.toggleErrorAlert = this.toggleErrorAlert.bind(this)

    this.changeSortASC = this.changeSortASC.bind(this)
    this.changeSortDESC = this.changeSortDESC.bind(this)

    this.changeSortField = this.changeSortField.bind(this)

    this.onHandleEdit = this.onHandleEdit.bind(this)
    this.onClearEdit = this.onClearEdit.bind(this)

    this.onChangeStartDate = this.onChangeStartDate.bind(this)
    this.onChangeEndDate = this.onChangeEndDate.bind(this)

    this.onChangePagination = this.onChangePagination.bind(this)

    this.handleSelectedFile = this.handleSelectedFile.bind(this)

    this.onToggleFileupload = this.onToggleFileupload.bind(this)
    this.handleFileDownload = this.handleFileDownload.bind(this)

    this.onShowRevisions = this.onShowRevisions.bind(this)
    this.closeRevisions = this.closeRevisions.bind(this)
  }

  /**
   * Async mount
   */
  componentDidMount() {
    Todo.find({
      orderBy: this.state.orderBy,
      orderByDirection: this.state.orderByDirection,
      from: this.state.startDate.toISOString().slice(0, 10).replace(/-/g, '-'),
      until: this.state.endDate.toISOString().slice(0, 10).replace(/-/g, '-'),
      pageSize: this.state.pageSize
    })
      .then(todos => {
        this.setState({
          todos: (todos) ? todos : []
        })
      })
      .catch(error => this.toggleErrorAlert(error))
  }

  /**
   * Refetch
   */
  refetchTodos() {
    Todo.find({
      orderBy: this.state.orderBy,
      orderByDirection: this.state.orderByDirection,
      from: this.state.startDate.toISOString().slice(0, 10).replace(/-/g, '-'),
      until: this.state.endDate.toISOString().slice(0, 10).replace(/-/g, '-'),
      pageSize: this.state.pageSize
    })
      .then(todos => {
        this.setState({
          todos: (todos) ? todos : []
        })
      })
      .catch(error => this.toggleErrorAlert(error))
  }

  /**
   * Async sorting
   */
  changeSortASC() {
    this.setState({ orderByDirection: Todo.ASC }, () => this.refetchTodos())
  }

  /**
   * Async sorting
   */
  changeSortDESC() {
    this.setState({ orderByDirection: Todo.DESC }, () => this.refetchTodos())
  }

  /**
   * Async
   */
  changeSortField(e) {
    if (e.target.value !== undefined) {
      var sortField = Todo.findMetaField(e.target.value)
      if (sortField !== undefined && sortField !== '') {
        this.setState({ orderBy: sortField }, () => this.refetchTodos())
      }
    }
  }

  /**
   * Async add todo
   * @param {Object}
   */
  onAddTodo({ ...attrs }) {
    if(this.state.selectedFile) {
      attrs.files = [
        this.state.selectedFile
      ]
    }

    const newTodo = new Todo(attrs)

    newTodo.save()
      .then(todo => this.setState({todos: [todo, ...this.state.todos]}))
      .catch(error => this.toggleErrorAlert(error))
  }

  /**
   * Async toggle state
   * @param {Object}
   */
  onToggleTodo(todo) {
    todo.isCompleted = todo.isCompleted === 0 ? 1 : 0
    todo.update()
      .then(updatedTodo => this.setState({todos: this.state.todos.map(t => t._id !== updatedTodo._id ? t : updatedTodo)}))
      .catch(error => this.toggleErrorAlert(error))
  }

  /**
   * Async edit todo
   * @param {Object}
   */
  onEditTodo(todo) {
    todo.update()
      .then(updatedTodo => this.setState({todos: this.state.todos.map(t => t._id !== updatedTodo._id ? t : updatedTodo), editing: ''}))
      .catch(error => this.toggleErrorAlert(error))
  }

  /**
   * Async delete todo
   * @param {Object}
   */
  onDeleteTodo(todo) {
    todo.destroy()
      .then(() => this.setState({todos: this.state.todos.filter(t => t._id !== todo._id)}))
      .catch(error => this.toggleErrorAlert(error))
  }

  /**
   * Async complete bulk todo
   * @param {Object}
   */
  async bulkCompleteTodos() {
    var todosToChange = []
    for (let todo in this.state.todos) {
      if (!this.state.todos[todo].isCompleted) {
        this.state.todos[todo].isCompleted = 1
        todosToChange.push(this.state.todos[todo])
      }
    }

    if (todosToChange.length > 0) {
      await Todo.bulkUpdate(todosToChange)
        .then(() => this.refetchTodos())
        .catch(error => this.toggleErrorAlert(error))
    }
  }

  /**
   * Async open bulk todo
   * @param {Object}
   */
  async bulkOpenTodos() {
    var todosToChange = []
    for (let todo in this.state.todos) {
      if (this.state.todos[todo].isCompleted) {
        this.state.todos[todo].isCompleted = 0
        todosToChange.push(this.state.todos[todo])
      }
    }

    if (todosToChange.length > 0) {
      await Todo.bulkUpdate(todosToChange)
        .then(() => this.refetchTodos())
        .catch(error => this.toggleErrorAlert(error))
    }
  }

  /**
   * Async lock todo
   * @param {Object}
   */
  onLockTodo(todo) {
    todo.lock()
      .then(lockedTodo => this.setState({todos: this.state.todos.map(t => t._id !== lockedTodo._id ? t : lockedTodo)}))
      .catch(error => this.toggleErrorAlert(error))
  }

  /**
   * Async unlock todo
   * @param {Object}
   */
  onUnlockTodo(todo) {
    todo.unlock()
      .then(unlockedTodo => this.setState({todos: this.state.todos.map(t => t._id !== unlockedTodo._id ? t : unlockedTodo)}))
      .catch(error => {
        this.toggleErrorAlert(error)
    })
  }

  /**
   * Handle edit
   * @param {Object}
   */
  onHandleEdit(todo) {
    this.setState({
      editing: (todo !== '') ? todo.md.id : ''
    })
  }

  /**
   * Clear edit
   * @param {}
   */
  onClearEdit() {
    this.setState({
      editing: ''
    })
  }

  /**
   * Change startDate
   * @param {Date} date
   */
  onChangeStartDate(date) {
    this.setState({ startDate: date }, () => this.refetchTodos())
  }

  /**
   * Change startDate
   * @param {Date} date
   */
  onChangeEndDate(date) {
    this.setState({ endDate: date }, () => this.refetchTodos())
  }

  /**
   * Change pagination
   * @param {Event} event
   */
  onChangePagination(e) {
    this.setState({ pageSize: e.target.value }, () => this.refetchTodos())
  }

  /**
   * Change fileupload
   * @param {Event} event
   */
  onToggleFileupload() {
    this.setState({showFileupload: !this.state.showFileupload })
  }

  /**
   * Toggle error alert
   * @param {Object}
   */
  toggleErrorAlert(error) {
    if (error.status === undefined) {
      error.status = 500
      error.text = error.message
    }

    this.setState({
      error: error
    })

    setTimeout(() => {
      this.setState({
        error: undefined
      })
    }, 6500)
  }

  /**
   * Handle file select
   * @param {Event} event 
   */
  handleSelectedFile(event) {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  /**
   * Handle blob download
   * @param {String} uuid 
   */
  handleFileDownload(todo) {
    todo.getFile()
      .then(blob => {
        let extension = MIME.extension(blob.type)

        if(!extension) {
          if(EXTRA_MIMES[blob.type] !== undefined) extension = EXTRA_MIMES[blob.type]
        }

        if(extension) {
          let url = window.URL.createObjectURL(blob)
          let link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'DownloadFromTodo.' + extension)
          document.body.appendChild(link)
          link.click()
          link.parentNode.removeChild(link)
        } else {
          this.toggleErrorAlert({
            'message': "Die Dateierweiterung kann nicht gelesen werden.",
            'code': 400
          })
        }
      })
  }

  onShowRevisions(todo) {
    todo.getArchive()
    .then(archive => {
      this.setState({
        archive: archive
      })
    })
    .catch(error => this.toggleErrorAlert(error))
  }

  closeRevisions() {
    this.setState({
      archive: []
    })
  }

  /**
   * Render View
   * @returns {Component}
   */
  render() {
    return (
      <React.Fragment>
        <div className="todoapp">
          <TodoList
            todos={this.state.todos}
            onAddTodo={this.onAddTodo}
            onEditTodo={this.onEditTodo}
            onToggleTodo={this.onToggleTodo}
            onDeleteTodo={this.onDeleteTodo}
            onLockTodo={this.onLockTodo}
            onUnlockTodo={this.onUnlockTodo}
            onToggleFileupload={this.onToggleFileupload}
            showFileupload={this.state.showFileupload}
            bulkCompleteTodos={this.bulkCompleteTodos}
            bulkOpenTodos={this.bulkOpenTodos}
            onHandleEdit={this.onHandleEdit}
            onClearEdit={this.onClearEdit}
            toggleErrorAlert={this.toggleErrorAlert}
            editing={this.state.editing}
            handleSelectedFile={this.handleSelectedFile}
            handleUpload={this.handleUpload}
            handleFileDownload={this.handleFileDownload}
            onShowRevisions={this.onShowRevisions}
            archive={this.state.archive}
            closeRevisions={this.closeRevisions}
          />
          {
            showFilter
              ? <FilterSort
                sorting={this.state.orderByDirection}
                changeSortField={this.changeSortField}
                changeSortASC={this.changeSortASC}
                changeSortDESC={this.changeSortDESC}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChangeStartDate={this.onChangeStartDate}
                onChangeEndDate={this.onChangeEndDate}
              />
              : null
          }
          {
            showPagination
              ? <Pagination onChangePagination={this.onChangePagination} />
              : null
          }
        </div>
        {
          showAlert
            ? <ErrorAlert error={this.state.error} />
            : null
        }

      </React.Fragment>
    )
  }
}

const showAlert = true
const showFilter = false
const showPagination = true
