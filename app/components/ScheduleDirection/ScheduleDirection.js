import React from 'react'
import { Text, View, StyleSheet, Platform, Dimensions } from 'react-native'
import { Schedules } from '~/components'
import { Card, Badge } from 'react-native-elements'

import { colors, fontSizes } from '~/styles'
import { parseTitle, parseDirection } from '~/utils/parse'

const { width } = Dimensions.get('window')
const SCHEDULE_ITEM_WIDTH = (width * 0.26)

export default function ScheduleDirection (props) {
  const directionTitle = parseDirection(props.directionsInfo.get('sentido'))
  let weekDaysType = props.directionsInfo.keySeq().toArray()
  weekDaysType = weekDaysType.filter((item) => item !== 'sentido')
  const isLastDirection = (props.directionsInfo.size === props.counter)

  return (
    <Card title={directionTitle}>
      {weekDaysType.map((weekDayType, index) => (
        <View key={index}>
          <View style={styles.dayTypeContainer}>
            <Badge key={index} value={parseTitle(weekDayType)} />
          </View>
          <Schedules key={index} schedules={props.directionsInfo.get(weekDayType)}/>
        </View>
      ))}
    </Card>
  )
}

const styles = StyleSheet.create({
  dayTypeContainer: {
    margin: 15,
    alignItems: 'center',
  },
})
