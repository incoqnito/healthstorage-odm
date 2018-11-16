import React, {Component} from 'react'
import classNames from 'classnames';

var app = app || {};

class Todo extends Component
{
	/**
	 * Constructor
	 * @param {Object} properties 
	 */
	constructor(properties) {
		super(properties);
	}

	/**
	 * Perfomance update
	 * @param {Object} nextProps 
	 * @param {Object} nextState 
	 */
	shouldComponentUpdate (nextProps, nextState) {
		return (nextProps.todo.status !== this.props.todo.status);
	}

	/**
	 * Set todo completed
	 */
	async toggleState()
	{
		var md = this.props.todo.md;
		md.r = md.r + 1;
		md.tsp = new Date().toISOString();

		var todo = {
			title: this.props.todo.title,
			status: (this.props.todo.status == 'init') ? 'completed' : 'init',
			md: md
		}

		var status = await this.props.model.update(this.props.todo.md.id, todo);

		if(status == 200) {
			this.props.updateHandler();
		}
	}

	/**
	 * Set todo completed
	 */
	async deleteTodo()
	{
		var status = await this.props.model.delete(this.props.todo.md.id);

		if(status == 204) {
			this.props.updateHandler();
		}
	}

	/**
	 * Render View
	 * @returns {Component} 
	 */
	render() {
		return (
			<li className={classNames({completed: this.props.todo.status == 'completed'})}>
				<div className="view">
					<input className="toggle" type="checkbox" checked={this.props.todo.status == "completed"} onChange={this.toggleState.bind(this)}/>
					<label>
						{this.props.todo.title}
					</label>
					<button className="destroy" onClick={this.deleteTodo.bind(this)}/>
				</div>
				<input ref="editField" className="edit" value="Hiiii" />
			</li>
		);
	}
}

export default Todo;