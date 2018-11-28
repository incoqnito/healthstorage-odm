import React from 'react'

import { Todo } from '../../models'

import { TodoList } from '../TodoList/TodoList'

import { ErrorAlert } from '../Alert/ErrorAlert'

import { FilterSort } from '../FilterSort/FilterSort'

export class Application extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor (props) {
    super(props)

    this.state = {
      todos: [],
      orderBy: Todo.META_DATE,
      orderByDirection: Todo.DESC,
      error: undefined,
      editing: ''
    }

    this.onAddTodo = this.onAddTodo.bind(this)
    this.onToggleTodo = this.onToggleTodo.bind(this)
    this.onEditTodo = this.onEditTodo.bind(this)
    this.onDeleteTodo = this.onDeleteTodo.bind(this)

    this.toggleErrorAlert = this.toggleErrorAlert.bind(this)

    this.changeSortASC = this.changeSortASC.bind(this)
    this.changeSortDESC = this.changeSortDESC.bind(this)

    this.changeSortField = this.changeSortField.bind(this)

    this.onHandleEdit = this.onHandleEdit.bind(this)
    this.onClearEdit = this.onClearEdit.bind(this)
  }

  /**
   * Async mount
   */
  async componentDidMount () {
    const todos = await Todo.findAll({
      orderBy: this.state.orderBy,
      orderByDirection: this.state.orderByDirection
    })
    this.setState({
      todos
    })
  }

  /**
   * Refetch
   */
  async refetchTodos () {
    try {
      const todos = await Todo.findAll({
        orderBy: this.state.orderBy,
        orderByDirection: this.state.orderByDirection
      })
      this.setState({
        todos: todos
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
    var todo = await Todo.create(attrs)

    this.setState({
      todos: [todo, ...this.state.todos]
    })
  }

  /**
   * Async toggle state
   * @bug its updateing every entry in array
   * @param {Object}
   */
  async onToggleTodo (todo) {
    try {
      todo.isCompleted = !todo.isCompleted
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
      const updatedTodo = await todo.update(todo)
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
      todo.destroy()
      this.setState({
        todos: this.state.todos.filter(t => t.id !== todo.id)
      })
    } catch (error) {
      this.toggleErrorAlert(error)
    }
  }

  /**
   * Handle edit
   * @param {}
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
        <div class="todoapp">
          <TodoList
            todos={this.state.todos}
            onAddTodo={this.onAddTodo}
            onEditTodo={this.onEditTodo}
            onToggleTodo={this.onToggleTodo}
            onDeleteTodo={this.onDeleteTodo}
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
              />
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

const showAlert = false
const showFilter = false