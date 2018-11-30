import React from 'react'
import classNames from 'classnames'

export class Pagination extends React.Component {
  render () {
    return (
      <div className="pagination-section">
        <div>
          <p>Choose Pagination</p>
          <select onChange={this.props.onChangePagination}>
            <option disabled>Choose page items</option>
            <option value="">Show all</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
    )
  }
}

export default Pagination
