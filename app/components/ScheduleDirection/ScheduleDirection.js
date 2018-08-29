import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Schedules } from '~/components'
import { Card, Badge } from 'react-native-elements'
import { parseTitle, parseDirection } from '~/utils/parse'

export default function ScheduleDirection (props) {
  return (
    <View>
      {props.schedules.entrySeq().map(([direction, dayTypes], index) => (
        <Card key={index} title={parseDirection(direction)}>
          {dayTypes.entrySeq().map(([dayType, schedules], index) => (
            <View key={index}>
              <View key={index} style={styles.dayTypeContainer}>
                <Badge key={index} value={parseTitle(dayType)} />
              </View>
              <Schedules schedules={schedules} />
            </View>
          ))}
        </Card>
      ))}
    </View>
    )
}

const styles = StyleSheet.create({
  dayTypeContainer: {
    margin: 15,
    alignItems: 'center',
  },
})
