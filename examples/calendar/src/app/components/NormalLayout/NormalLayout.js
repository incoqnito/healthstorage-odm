import React from 'react'
import styled from 'styled-components'

export class NormalLayout extends React.PureComponent {
  static defaultProps = {
    inverted: false
  }
  render () {
    return (
      <LayoutWrapper>
        <HeaderWrapper inverted={this.props.inverted}>
          <HeaderContainer maxWidth={this.props.maxWidth} />
        </HeaderWrapper>
        <ContentContainer maxWidth={this.props.maxWidth} withSidebar={this.props.withSidebar}>
          <ContentWrapper>
            { this.props.children }
          </ContentWrapper>
        </ContentContainer>
      </LayoutWrapper>
    )
  }
}

NormalLayout.defaultProps = {
  navigationControls: true,
  profileControls: true
}

const ContentWrapper = styled.div`
  flex: 0 1 100%;
  display: flex;
  flex-direction: column;
`

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #F8F8F8;
`

const FooterWrapper = styled.div`
  flex: 0 0 auto;
  width: 100%;
`

const HeaderWrapper = styled.div`
  flex: 0 0 auto;
  width: 100%;
  background: #38ada9
  ${props => props.inverted && `
    background: none;
  `}
`

const HeaderContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  max-width: 1920px;
  padding: 0 32px;
  width: 100%;
`

const ContentContainer = styled.div`
  margin: ${props => props.withSidebar ? '' : '16px auto'};
  display: flex;
  flex-direction: column;
  max-width: ${props => props.maxWidth || '1920px'}; 
  padding: ${props => props.withSidebar ? '' : '0 16px'};
  width: 100%;
  height: 100%;
  overflow: auto;
`
