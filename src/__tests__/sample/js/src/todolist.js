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
      todoInput: '',
      todos: {}
    };
  }

  /**
   * Fetch Todos while app is mounting
   */
  componentWillMount()
  {
    this.fetchTodos().then(res => this.setState({
      todos: res,
      todoInput: ''
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
	 * Handle input update
	 * @param {Mixed} event 
	 */
  changeInputValue(event)
  {
    this.setState({todoInput: event.target.value});
  }

  /**
	 * Add new todo
	 * @param {Mixed} event 
	 */
  async addNewTodo(event) 
	{
		if(event.keyCode != ENTER_KEY || event.target.value.trim() == "") return;
    
		var todo = {
			title: event.target.value,
			status: 'init'
		}

    var uuid = await this.model.create(todo, this.uuid());
    
    if(uuid !== undefined) {
      
      var todos = await this.model.findAll();
      
      this.setState({
        todos: todos,
        todoInput: ''
      });
    }
  }
  
  /**
   * UUID
   * @returns {String}
   */
  uuid() {
    var i, random;
    var uuid = '';
    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
        .toString(16);
    }
    return uuid;
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
              onChange={this.changeInputValue.bind(this)}
              autoFocus={true}
              value={this.state !== null ? this.state.todoInput : ''}
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
    return <Todo key={key} todo={todo} model={this.model}/>;
  }
}

export default TodoList;