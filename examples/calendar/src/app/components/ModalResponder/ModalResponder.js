import React from 'react'
import { ModalConsumer } from '../ModalProvider/ModalProvider'

export class ModalResponder extends React.PureComponent {
  onClose = (id, onClose, hideModal) => () => Promise.resolve(hideModal(id)).then(onClose)
  onSubmit = (id, onSubmit, hideModal) => (...args) => Promise.resolve(hideModal(id)).then(() => onSubmit(...args))

  render () {
    return (
      <ModalConsumer>
        {
          this.renderModals
        }
      </ModalConsumer>
    )
  }

  renderModals = ({ components, hideModal }) => {
    return components.map(({ component: Component, id, props: { onSubmit, onClose, ...props } }) => {
      return Component
        ? <Component
          {...props}
          key={id}
          onClose={this.onClose(id, onClose, hideModal)}
          onSubmit={this.onSubmit(id, onSubmit, hideModal)}
        />
        : null
    })
  }
}
