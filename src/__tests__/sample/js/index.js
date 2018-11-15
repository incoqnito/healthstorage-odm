
require('babel-polyfill');
import React from 'react'
import TodoApp from "./src/app";

(function () {

	'use strict';

	React.createClass({
		getInitialState: function () {
			return {};
		},
		render: function () {
			return (
					<TodoList />
			);
		}
	});

	function render() {
		React.render(
			<TodoApp />,
			document.getElementsByClassName('todoapp')[0]
		);
	}

	render();
})();
