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
	 * Set todo completed
	 */
	async toggleState()
	{
		this.props.todo.status = (this.props.todo.status == 'init') ? 'completed' : 'init';
		this.props.todo.md.r = this.props.todo.md.r + 1;
		this.props.todo.md.tsp = new Date().toISOString();

		await this.props.model.update(this.props.todo.md.id, this.props.todo);

		this.setState({
			todos: await this.props.model.findAll()
		});
	}

		/**
	 * Set todo completed
	 */
	async delete()
	{
		await this.props.model.delete(this.props.todo.md.id);
		this.setState({
			todos: await this.props.model.findAll()
		});
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
					<button className="destroy" onClick={this.delete.bind(this)}/>
				</div>
				<input ref="editField" className="edit" value="Hiiii" />
			</li>
		);
	}
}

export default Todo;