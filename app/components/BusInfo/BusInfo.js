import React, { Component } from 'react'
import { View } from 'react-native'
import { ScheduleDirection } from '~/components'

export default class BusInfo extends Component {

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
