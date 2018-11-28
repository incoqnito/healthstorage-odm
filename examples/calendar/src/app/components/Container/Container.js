import styled from 'styled-components'

const isTruthyOrZero = value => value || value === 0

export const Container = styled.div`
  ${props => (props.alignContent ? `align-content: ${props.alignContent};` : '')}
  ${props => (props.alignSelf ? `align-self: ${props.alignSelf};` : '')}
  ${props => (props.alignItems ? `align-items: ${props.alignItems};` : '')}
  ${props => (props.display ? `display: ${props.display};` : '')}
  ${props => (isTruthyOrZero(props.flex) ? `flex: ${props.flex};` : '')}
  ${props => (isTruthyOrZero(props.flexBasis) ? `flex-basis: ${props.flexBasis};` : '')}
  ${props => (props.flexDirection ? `flex-direction: ${props.flexDirection};` : '')}
  ${props => (isTruthyOrZero(props.flexGrow) ? `flex-grow: ${props.flexGrow};` : '')}
  ${props => (isTruthyOrZero(props.flexShrink) ? `flex-shrink: ${props.flexShrink};` : '')}
  ${props => (props.flexWrap ? `flex-wrap: ${props.flexWrap};` : '')}
  ${props => (props.justifyContent ? `justify-content: ${props.justifyContent};` : '')}
  ${props => (isTruthyOrZero(props.margin) ? `margin: ${props.margin};` : '')}
  ${props => (isTruthyOrZero(props.marginBottom) ? `margin-bottom: ${props.marginBottom};` : '')}
  ${props => (isTruthyOrZero(props.marginLeft) ? `margin-left: ${props.marginLeft};` : '')}
  ${props => (isTruthyOrZero(props.marginRight) ? `margin-right: ${props.marginRight};` : '')}
  ${props => (isTruthyOrZero(props.marginTop) ? `margin-top: ${props.marginTop};` : '')}
  ${props => (isTruthyOrZero(props.maxHeight) ? `max-height: ${props.maxHeight};` : '')}
  ${props => (isTruthyOrZero(props.maxWidth) ? `max-width: ${props.maxWidth};` : '')}
  ${props => (isTruthyOrZero(props.minHeight) ? `min-height: ${props.minHeight};` : '')}
  ${props => (isTruthyOrZero(props.minWidth) ? `min-width: ${props.minWidth};` : '')}
  ${props => (isTruthyOrZero(props.order) ? `order: ${props.order};` : '')}
  ${props => (isTruthyOrZero(props.padding) ? `padding: ${props.padding};` : '')}
  ${props => (isTruthyOrZero(props.paddingBottom) ? `padding-bottom: ${props.paddingBottom};` : '')}
  ${props => (isTruthyOrZero(props.paddingLeft) ? `padding-left: ${props.paddingLeft};` : '')}
  ${props => (isTruthyOrZero(props.paddingRight) ? `padding-right: ${props.paddingRight};` : '')}
  ${props => (isTruthyOrZero(props.paddingTop) ? `padding-top: ${props.paddingTop};` : '')}
  ${props => (isTruthyOrZero(props.width) ? `width: ${props.width};` : '')}
  ${props => (isTruthyOrZero(props.height) ? `height: ${props.height};` : '')}
`
