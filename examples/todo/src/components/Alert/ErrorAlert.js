import React from 'react'
import classNames from 'classnames'

export class ErrorAlert extends React.Component {
  render () {
    const alertClassNames = classNames({ 'dnone': this.props.error === undefined, 'alert-error': this.props.error !== undefined })

    var errorStatus = this.props.error !== undefined ? this.props.error.status : 0
    var errorText = this.props.error !== undefined ? this.props.error.message : ''

    return (
      <div className={alertClassNames} >
        Oops! Ein Fehler ist aufgetreten!<br></br>
        <b>{errorStatus}: {errorText}</b>
      </div>
    )
  }
}

export default ErrorAlert
