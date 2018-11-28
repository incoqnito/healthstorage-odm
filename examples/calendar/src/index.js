import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import { Application } from 'layout'
import { ModalProvider } from './app/components/ModalProvider/ModalProvider'
import { ModalResponder } from './app/components/ModalResponder/ModalResponder'

import Overview from './app/scenes/Overview/Overview'

ReactDOM.render((
  <ModalProvider>
    <Overview />
    <ModalResponder />
  </ModalProvider>
), document.getElementById('root'))
