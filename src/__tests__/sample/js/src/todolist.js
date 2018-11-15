import React, {Component} from 'react'
import HealthStorage from '../../../../healthStorage';
import Todo from './todo';

var app = app || {};

const ENTER_KEY = 13;
var todoItems = {};

class TodoList extends Component
{
	/**
	 * Constructor
   * Define HS Model
	 */
  constructor() 
  {
    super();
    this.model = HealthStorage.define(
			"TodoSchema",
			{
					title: {
							type: HealthStorage.STRING
					},
					status: {
							type: HealthStorage.STRING
					}
			},
			{
				required: ['md'],
				id: '82897c48-92f8-4a7f-8360-929e8b12356c',
				oId: '82897c48-92f8-4a7f-4550-929e8b12356c'
			}
		);
  }

  /**
   * Set initial state of todos as empty
   */
  getInitialState() 
  {
    return {
      todos: {}
    };
  }

  /**
   * Fetch Todos while app is mounting
   */
  componentWillMount()
  {
    this.fetchTodos().then(res => this.setState({
      todos: res
    }));
  }
  
  /**
   * Fetch Todos
   * @return {Promise}
   */
  fetchTodos() 
  {
    return this.model.findAll();
  }

  /**
	 * Add new todo
	 * @param {Mixed} event 
	 */
  async addNewTodo(event) 
	{
		if(event.keyCode != ENTER_KEY || event.target.value.trim() == "") return;
	
		var todo = {
			title:event.target.value,
			status: 'init'
		}

    await this.model.create(todo);
    
    this.setState({
      todos: await this.model.findAll()
    });
	}

	/**
	 * Render View
	 * @returns {Component} 
	 */
	render() {

    if(this.state !== null && this.state.todos !== undefined) {
      todoItems = this.state.todos.map(function (todo) {
        return this.renderTodo(todo.md.id, todo);
      }, this);
    }

		return (
      <div>
					<header className="header">
						<h1>todos</h1>
						<input
              className="new-todo"
              placeholder="What needs to be done?"
              onKeyDown={this.addNewTodo.bind(this)}
              autoFocus={true}
            />
					</header>
          <section className="main">
            <input id="toggle-all" className="toggle-all" type="checkbox" checked="false" />
            <label htmlFor="toggle-all"	/>
              <ul className="todo-list">
                {todoItems}
              </ul>
          </section>
      </div>
		);
  }
  
  /**
   * Render todo
   * @param {String} key 
   * @param {Object} todo 
   */
  renderTodo(key, todo)
  {
    return <Todo key={key} todo={todo}/>;
  }
}

export default TodoList;