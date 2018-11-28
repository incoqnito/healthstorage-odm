import styled from 'styled-components'

export const Button = styled.button`
  padding: 12px;
  border: 0;
  outline: none;
  cursor: pointer;
  background: #efefef;
  color: #666;
  border: 1px solid #ddd;
  margin-left: 8px;
  border-radius: 1px;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: 0.3s filter ease-in-out;
  ${props => (props.width ? `width: ${props.width};` : '')}

  &[disabled] {
    filter: grayscale(0.5);
    cursor: not-allowed;
  }
  &:first-child {
    margin-left: 0;
  }

  ${props => props.xl && `
    width: 200px
    font-size: 14px;
    line-height: 1;
    text-transform: uppercase;
`}

  ${props => props.xs && `
    padding: 4px 8px;
    line-height: 1;
    font-size: 12px;
  `}
`

export const PrimaryButton = Button.extend`
  background: #12B1CF;
  color: white;
  border: 1px solid #2980B9;
  ${props => props.inverted && `
    background: white;
    color: #12B1CF;
    border: 1px solid #12B1CF;
`}

`

export const SuccessButton = Button.extend`
  background: #2ecc71;
  color: white;
  border: 1px solid #27AE60;
  ${props => props.inverted && `
    background: white;
    color: #2ecc71;
    border: 1px solid #2ecc71;
  `}
`

export const ErrorButton = Button.extend`
  background: #e74c3c;
  color: white;
  border: 1px solid #c0392b;
  ${props => props.inverted && `
    background: white;
    color: #e74c3c;
    border: 1px solid #e74c3c;
  `}
`
