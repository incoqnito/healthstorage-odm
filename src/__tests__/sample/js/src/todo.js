import React, {Component} from 'react'

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
	 * Render View
	 * @returns {Component} 
	 */
	render() {
		return (
			<li>
				<div className="view">
					<input className="toggle" type="checkbox" checked={this.props.todo.status == "completed"}/>
					<label>
						{this.props.todo.title}
					</label>
					<button className="destroy" />
				</div>
				<input ref="editField" className="edit" value="Hiiii" />
			</li>
		);
	}
}

export default Todo;