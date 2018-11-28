import React from 'react'
import uuid from 'uuid/v4'

const ModalContext = React.createContext({
  components: [],
  showModal: () => {},
  hideModal: () => {}
})

export class ModalProvider extends React.Component {
  showModal = (component, props = {}) => {
    const components = this.state.components.concat({
      id: uuid(),
      component,
      props
    })
    this.setState({ components })
  };

  hideModal = (id) => {
    return new Promise((resolve) => {
      const components = this.state.components.filter((modal) => modal.id !== id)
      this.setState({ components }, resolve)
    })
  }

  state = {
    components: [],
    showModal: this.showModal,
    hideModal: this.hideModal
  };

  render () {
    return (
      <ModalContext.Provider value={this.state}>
        {
          this.props.children
        }
      </ModalContext.Provider>
    )
  }
}

export const ModalConsumer = ModalContext.Consumer
