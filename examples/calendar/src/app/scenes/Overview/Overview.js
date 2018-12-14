import React from 'react'

import { Chroniq } from '../../components/Chroniq/Chroniq'
import { withModal } from '../../components/Modal/Modal'
import { NormalLayout } from '../../components/NormalLayout/NormalLayout'

import { Event } from './../../models'

@withModal
export default class Overview extends React.Component {
  state = {
    view: 'week',
    date: new Date(),
    events: []
  }
  render() {
    return (
      <NormalLayout title='Terminkalender'>
        <Chroniq
          popup
          selectable
          date={this.state.date}
          view={this.state.view}
          events={this.state.events}
        />
      </NormalLayout>
    )
  }
}

Overview.defaultProps = {
  events: []
}
