/** import react */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

/** import aplication */
import { App } from "./Components/App/App"

/** import redux store */
import { store } from './Redux/store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);