import React from 'react'
import classNames from 'classnames'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class FilterSort extends React.Component {
  render () {
    const classNamesASC = classNames({ 'active': this.props.sorting === 'Ascending' })
    const classNamesDESC = classNames({ 'active': this.props.sorting === 'Descending' })

    return (
      <div className="filter-section">
        <div>
          <ul>
            <li><p>Sortierung:</p></li>
            <li><button className={classNamesDESC} onClick={this.props.changeSortDESC}>&#8593;</button></li>
            <li><button className={classNamesASC} onClick={this.props.changeSortASC}>&#8595;</button></li>
          </ul>
          <ul>
            <li><p>Sortien nach:</p></li>
            <li>
              <select onChange={this.props.changeSortField}>
                <option disabled>Sortierung wählen</option>
                <option value="tsp">Tsp</option>
                <option value="id">Id</option>
                <option value="r">Revision</option>
              </select>
            </li>
          </ul>
        </div>
        <div>
          <ul className="filter-list">
            <li><p>Filtern:</p></li>
            <li>Von: <DatePicker selected={this.props.startDate} onChange={this.props.onChangeStartDate}/></li>
            <li>Bis: <DatePicker selected={this.props.endDate} onChange={this.props.onChangeEndDate}/></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default FilterSort
