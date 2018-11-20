import React from 'react'

import { Todo } from '../../models'

import { TodoList } from '../TodoList/TodoList'

import { ErrorAlert } from '../Alert/ErrorAlert'

export class Application extends React.Component {
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

  async componentDidMount () {
    const todos = await Todo.findAll()

    this.setState({
      todos
    })
  }

  async onAddTodo ({ id, ...attrs }) {
    const todo = await Todo.create(attrs, id)

    this.setState({
      todos: [todo, ...this.state.todos]
    })
  }

  async onToggleTodo ({ md, ...attrs }) {
    try {
      const changedTodo = {
        ...attrs,
        md,
        isCompleted: !attrs.isCompleted
      }

      await Todo.updateById(md.id, {
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

  async onEditTodo (todo) {
    this.setState({
      todos: this.state.todos
    });
  }

  async onDeleteTodo (todo) {
    try {
      await Todo.delete(todo.md.id)

      this.setState({
        todos: this.state.todos.filter(t => t.md.id !== todo.md.id)
      })
    } catch (error) {
      this.toggleErrorAlert(error);
    }
  }

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
