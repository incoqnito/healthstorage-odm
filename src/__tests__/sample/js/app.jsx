/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/
import React from 'react';
import Router  from 'react-router';
import HealthStorage from './../../../healthStorage';

var app = app || {};

(function () {
	'use strict';

	app.ALL_TODOS = 'all';
	app.ACTIVE_TODOS = 'active';
	app.COMPLETED_TODOS = 'completed';
	var TodoFooter = app.TodoFooter;
	var TodoItem = app.TodoItem;

	var ENTER_KEY = 13;

	var model = HealthStorage.define(
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

	var TodoApp = React.createClass({
		getInitialState: function () {
			return {
				nowShowing: app.ALL_TODOS,
				editing: null,
				newTodo: ''
			};
		},

		componentDidMount: function () {
			var setState = this.setState;
		},

		componentWillMount: function(){
			this.fetchTodos().then(res => this.setState({
				todos: res
			}));
		},

		handleChange: function (event) {
			this.setState({newTodo: event.target.value});
		},

		handleNewTodoKeyDown: function (event) {
			if (event.keyCode !== ENTER_KEY) {
				return;
			}

			event.preventDefault();

			var val = this.state.newTodo.trim();

			if (val) {
				this.props.model.addTodo(val);
				this.setState({newTodo: ''});
			}
		},

		fetchTodos() {return this.props.model.findAll();},

		render: function () {
			var footer;
			var main;

			var todoItems = {};

			if (this.state.todos !== undefined && this.state.todos.length) {
				todoItems = this.state.todos.map(function (todo) {
					return (
						<li>
							<div className="view">
								<input className="toggle" type="checkbox" />
								<label>
									{todo.title}
								</label>
								<button className="destroy" />
							</div>
							<input ref="editField" className="edit" value="Hiiii" />
						</li>
					);
				}, this);
				console.log(todoItems);
			}

			return (
				<div>
					<header className="header">
						<h1>todos</h1>
						<input
							className="new-todo"
							placeholder="What needs to be done?"
							value={this.state.newTodo}
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
	});

	function render() {
		React.render(
			<TodoApp model={model}/>,
			document.getElementsByClassName('todoapp')[0]
		);
	}

	// model.subscribe(render);
	render();
})();
