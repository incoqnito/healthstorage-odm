import React from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'

import { withRouter } from 'react-router'

import { ModalConsumer } from '../ModalProvider/ModalProvider'

import { Button, PrimaryButton } from '../Button/Button'
import { Container } from '../Container/Container'

export const asModal = (options = {}) => (WrappedComponent) => {
  const entrypoint = document.querySelector('body')
  const { closeButton = true, closeOnEscape = false, withoutLayout = false, blurBackground = false, height, width = 'auto' } = options

  class ModalEnhancer extends React.PureComponent {
    constructor (props) {
      super(props)

      this.rootEl = document.querySelector('#root')
    }
    onKeyUp = (event) => {
      if (closeOnEscape && event.keyCode === 27) {
        event.stopPropagation()
        this.props.onClose(event)
      }
    }
    componentDidMount () {
      if (blurBackground) {
        this.rootEl.style.filter = 'blur(4px)'
      }
      window.addEventListener('keyup', this.onKeyUp)
    }

    componentWillUnmount () {
      if (blurBackground) {
        this.rootEl.style.filter = 'blur(0px)'
      }
      window.removeEventListener('keyup', this.onKeyDown)
    }

    render () {
      let { ...restProps } = this.props

      return ReactDOM.createPortal((
        <ModalWrapper blurBackground={blurBackground} className={this.props.className}>
          <ModalOverlay />
          <ModalContainer withoutLayout={withoutLayout} width={width} height={height}>
            {
              closeButton && (
                <CloseButton onClick={restProps.onClose} />
              )
            }
            <WrappedComponent onClose={restProps.onClose} {...restProps} />

          </ModalContainer>
        </ModalWrapper>
      ), entrypoint)
    }
  }

  return withRouter(ModalEnhancer)
}

export const withModal = (WrappedComponent) => (props) => {
  return <ModalConsumer>
    {
      ({ showModal }) => <WrappedComponent showModal={showModal} {...props} />
    }
  </ModalConsumer>
}

const CloseButton = styled.div`
  position: absolute;
  z-index: 3;
  top: -12px;
  right: -12px;
  width: 33px;
  height: 33px;
  background: white;
  border-radius: 32px;
  padding: 6px;
  cursor: pointer;
  &:before, &:after {
    position: absolute;
    content: '';
    width: 1px;
    top: 8px;
    right: 16px;
    background: #666;
    height: 16px;
  }
  &:after {
    transform: rotate(45deg)
  }
  &:before {
    transform: rotate(-45deg)
  }

`

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: height 0.3s ease-in;
`

const ModalContainer = styled.div`
  z-index: 1002;
  position: relative;
  max-width: ${props => props.width};
  width: 100%;
  height: ${props => props.height ? '100%' : 'auto'};
  max-height: ${props => props.height || 'auto'};
  overflow: visible;
  ${props => !props.withoutLayout && `
    background-color: #fff;
    box-shadow: 8px 8px 16px rgba(0,0,0, 0.1412);
    overflow: visible;
    border-radius: 3px;
  `}
`

const ModalOverlay = styled.div`
  background-color: rgba(0,0,0,0.4);
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 1001;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  margin: 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #ddd;
`

export const ModalHeader = styled.div`
  padding: 24px;
  padding-bottom: 0px;

`

export const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  padding: 24px;
  padding-top: 0;
  bottom: 0;
  position: absolute;
  width: 100%;
  justify-content: flex-end;
`

export const ModalSection = styled(Container)`
  padding: ${props => props.padding || '24px'};
  padding-bottom: ${props => props.paddingBottom || '80px'};
  flex: ${props => props.flex || '1 0 auto'};
`

export const ModalContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
`

export const PrimaryModalButton = styled(PrimaryButton)`
  border-radius: 20px;
`

export const ModalButton = styled(Button)`
  border-radius: 20px;
`
