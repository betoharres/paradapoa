import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { ScheduleDirection } from '~/components'

import { Map } from 'immutable'

export default class BusInfo extends Component {

  static propTypes = {
    busInfo: PropTypes.instanceOf(Map)
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const directions = this.props.busInfo.keySeq().toArray()
    return directions.map((direction, index) => (
      <ScheduleDirection
        key={index}
        counter={++index}
        directionsInfo={this.props.busInfo.get(direction)} />
    ))
  }

}
