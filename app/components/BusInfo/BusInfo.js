import React from 'react'
import { View } from 'react-native'
import { ScheduleDirection } from '~/components'

export default function BusInfo (props) {
  const directions = props.busInfo.keySeq().toArray()

  return (
    <View>
      {directions.map((direction, index) => (
        <ScheduleDirection key={index} directionsInfo={props.busInfo.get(direction)} />
      ))}
    </View>
  )

}
