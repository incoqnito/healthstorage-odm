
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

import { Application } from './src/components/Application/Application'

ReactDOM.render(
  <Application />,
  document.getElementsByClassName('todoapp')[0]
)
