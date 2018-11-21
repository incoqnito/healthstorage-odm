import React from 'react'
import classNames from 'classnames'
import { timingSafeEqual } from 'crypto';

export class Sort extends React.Component 
{
  constructor(props) 
  {
    super(props);
  }

  render() 
  {
    return (
      <div className="filter-section" >
        <p>Sortierung</p>
        <ul>
          <li><button onClick={this.props.changeSortASC}>&#8593;</button></li>
          <li><button onClick={this.props.changeSortDESC}>&#8595;</button></li>
        </ul>
      </div>
    );
  }
}

export default Sort;