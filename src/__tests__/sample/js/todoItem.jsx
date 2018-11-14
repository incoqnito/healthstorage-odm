/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
import React from 'react';

var app = app || {};

(function () {
	'use strict';

	app.TodoItem = React.createClass({
	

		getInitialState: function () {},

		shouldComponentUpdate: function (nextProps, nextState) {},

		componentDidUpdate: function (prevProps) {},

		render: function () {
			return (
				<li>
					<div className="view">
						<input className="toggle" type="checkbox" />
						<label>
							Tesssst
						</label>
						<button className="destroy" />
					</div>
					<input ref="editField" className="edit" value="Hiiii" />
				</li>
			);
		}
	});
})();
