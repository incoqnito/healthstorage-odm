import React from 'react'

import { Todo } from '../../models'

import { TodoList } from '../TodoList/TodoList'

import { ErrorAlert } from '../Alert/ErrorAlert'

export class Application extends React.Component {

  /**
   * Constructor
   * @param {Object} props 
   */
  constructor (props) {
    super(props)

    this.state = {
      todos: [],
      error: undefined
    }

    this.onAddTodo = this.onAddTodo.bind(this)
    this.onToggleTodo = this.onToggleTodo.bind(this)
    this.onEditTodo = this.onEditTodo.bind(this)
    this.onDeleteTodo = this.onDeleteTodo.bind(this)

    this.toggleErrorAlert = this.toggleErrorAlert.bind(this)
  }

  /**
   * Async mount
   */
  async componentDidMount () {
    const todos = await Todo.findAll()

    this.setState({
      todos
    })
  }

  /**
   * Async add todo
   * @bug md.id is on create the same for all elements
   * @param {Object}  
   */
  async onAddTodo ({...attrs}) {
    var todo = await Todo.create(attrs)

    this.setState({
      todos: [todo, ...this.state.todos]
    })
  }

  /**
   * Async toggle state
   * @param {Object}  
   */
  async onToggleTodo ({ md, ...attrs }) {
    try {
      const changedTodo = await Todo.updateById(md.id, {
        ...attrs,
        md,
        isCompleted: !attrs.isCompleted
      })
      this.setState({
        todos: this.state.todos.map(todo => todo.md.id !== md.id ? todo : changedTodo)
      })
    } catch (error) {
      this.toggleErrorAlert(error);
    }
  }

  /**
   * Async edit todo
   * @param {Object}  
   */
  async onEditTodo (todo) {
    this.setState({
      todos: this.state.todos
    });
  }

  /**
   * Async delete todo
   * @param {Object}  
   */
  async onDeleteTodo (todo) {
    try {
      var deletedTodoId = await Todo.delete(todo.md.id)
      this.setState({
        todos: this.state.todos.filter(t => t.md.id !== deletedTodoId)
      });

    } catch (error) {
      this.toggleErrorAlert(error);
    }
  }

  /**
   * Toggle error alert
   * @param {Object}  
   */
  toggleErrorAlert(error) 
  {
    this.setState({
      error: error
    });

    setTimeout( () => {
      this.setState({
        error: undefined
      });
    }, 3000);
  }

  /**
   * Render View
   * @returns {Component}
   */
  render () {
    return (
      <div>
        <ErrorAlert error={this.state.error}/>
        <TodoList
          todos={this.state.todos}
          onAddTodo={this.onAddTodo}
          onEditTodo={this.onEditTodo}
          onToggleTodo={this.onToggleTodo}
          onDeleteTodo={this.onDeleteTodo}
          toggleErrorAlert={this.toggleErrorAlert}
        />
      </div>
    )
  }
}
