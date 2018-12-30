import React from 'react'

import { Todo } from '../../models'

import { TodoList } from '../TodoList/TodoList'

import { ErrorAlert } from '../Alert/ErrorAlert'

import { FilterSort } from '../FilterSort/FilterSort'

import { Pagination } from '../Pagination/Pagination'

export class Application extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor (props) {
    super(props)

    this.state = {
      todos: [],
      orderBy: Todo.MD_DATE,
      orderByDirection: Todo.DESC,
      error: undefined,
      editing: '',
      startDate: new Date(),
      endDate: new Date('2018-12-31'),
      pageSize: ''
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
  }

  /**
   * Async mount
   */
  async componentDidMount () {
    const todos = await Todo.findAll({
      orderBy: this.state.orderBy,
      orderByDirection: this.state.orderByDirection,
      from: this.state.startDate.toISOString().slice(0, 10).replace(/-/g, '-'),
      until: this.state.endDate.toISOString().slice(0, 10).replace(/-/g, '-'),
      pageSize: this.state.pageSize
    })
    this.setState({
      todos: todos.list
    })
  }

  /**
   * Refetch
   */
  async refetchTodos () {
    try {
      const todos = await Todo.findAll({
        orderBy: this.state.orderBy,
        orderByDirection: this.state.orderByDirection,
        from: this.state.startDate.toISOString().slice(0, 10).replace(/-/g, '-'),
        until: this.state.endDate.toISOString().slice(0, 10).replace(/-/g, '-'),
        pageSize: this.state.pageSize
      })

      this.setState({
        todos: todos.list
      })
    } catch (error) {
      this.toggleErrorAlert(error)
    }
  }

  /**
   * Async sorting
   */
  async changeSortASC () {
    this.setState({ orderByDirection: Todo.ASC }, () => this.refetchTodos())
  }

  /**
   * Async sorting
   */
  async changeSortDESC () {
    this.setState({ orderByDirection: Todo.DESC }, () => this.refetchTodos())
  }

  /**
   * Async
   */
  async changeSortField (e) {
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
  async onAddTodo ({ ...attrs }) {
    try {
      var todo = await Todo.create(attrs)
      this.setState({
        todos: [todo, ...this.state.todos]
      })
    } catch (error) {
      this.toggleErrorAlert(error)
    }
  }

  /**
   * Async toggle state
   * @param {Object}
   */
  async onToggleTodo (todo) {
    try {
      todo.isCompleted = todo.isCompleted === 0 ? 1 : 0
      const updatedTodo = await todo.update(todo)

      this.setState({
        todos: this.state.todos.map(t => t.md.id !== updatedTodo.md.id ? t : updatedTodo)
      })
    } catch (error) {
      this.toggleErrorAlert(error)
    }
  }

  /**
   * Async edit todo
   * @param {Object}
   */
  async onEditTodo (todo) {
    try {
      const updatedTodo = await todo.save()
      this.setState({
        todos: this.state.todos.map(t => t.md.id !== updatedTodo.md.id ? t : updatedTodo),
        editing: ''
      })
    } catch (error) {
      this.toggleErrorAlert(error)
    }
  }

  /**
   * Async delete todo
   * @param {Object}
   */
  async onDeleteTodo (todo) {
    try {
      await todo.destroy()
      this.setState({
        todos: this.state.todos.filter(t => t.md.id !== todo.md.id)
      })
    } catch (error) {
      this.toggleErrorAlert(error)
    }
  }

  /**
   * Async complete bulk todo
   * @param {Object}
   */
  async bulkCompleteTodos () {
    try {
      var todosToChange = []
      for (let todo in this.state.todos) {
        if (!this.state.todos[todo].isCompleted) {
          this.state.todos[todo].isCompleted = 1
          todosToChange.push(this.state.todos[todo])
        }
      }

      if (todosToChange.length > 0) {
        await Todo.bulkUpdate(todosToChange)
        this.refetchTodos()
      }
    } catch (error) {
      this.toggleErrorAlert(error)
    }
  }

  /**
   * Async open bulk todo
   * @param {Object}
   */
  async bulkOpenTodos () {
    try {
      var todosToChange = []
      for (let todo in this.state.todos) {
        if (this.state.todos[todo].isCompleted) {
          this.state.todos[todo].isCompleted = 0
          todosToChange.push(this.state.todos[todo])
        }
      }

      if (todosToChange.length > 0) {
        await Todo.bulkUpdate(todosToChange)
        this.refetchTodos()
      }
    } catch (error) {
      this.toggleErrorAlert(error)
    }
  }

  /**
   * Async lock todo
   * @param {Object}
   */
  async onLockTodo (todo) {
    try {
      const lockedTodo = await todo.lock()
      this.setState({
        todos: this.state.todos.map(t => t.md.id !== lockedTodo.md.id ? t : lockedTodo)
      })
    } catch (error) {
      this.toggleErrorAlert(error)
    }
  }

  /**
   * Async unlock todo
   * @param {Object}
   */
  async onUnlockTodo (todo) {
    try {
      const unlockedTodo = await todo.unlock()
      this.setState({
        todos: this.state.todos.map(t => t.md.id !== unlockedTodo.md.id ? t : unlockedTodo)
      })
    } catch (error) {
      this.toggleErrorAlert(error)
    }
  }

  /**
   * Handle edit
   * @param {Object}
   */
  onHandleEdit (todo) {
    this.setState({
      editing: (todo !== '') ? todo.md.id : ''
    })
  }

  /**
   * Clear edit
   * @param {}
   */
  onClearEdit () {
    this.setState({
      editing: ''
    })
  }

  /**
   * Change startDate
   * @param {Date} date
   */
  onChangeStartDate (date) {
    this.setState({startDate: date}, () => this.refetchTodos())
  }

  /**
   * Change startDate
   * @param {Date} date
   */
  onChangeEndDate (date) {
    this.setState({endDate: date}, () => this.refetchTodos())
  }

  /**
   * Change pagination
   * @param {Event} event
   */
  onChangePagination (e) {
    this.setState({pageSize: e.target.value}, () => this.refetchTodos())
  }

  /**
   * Toggle error alert
   * @param {Object}
   */
  toggleErrorAlert (error) {
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
   * Render View
   * @returns {Component}
   */
  render () {
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
            bulkCompleteTodos={this.bulkCompleteTodos}
            bulkOpenTodos={this.bulkOpenTodos}
            onHandleEdit={this.onHandleEdit}
            onClearEdit={this.onClearEdit}
            toggleErrorAlert={this.toggleErrorAlert}
            editing={this.state.editing}
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
