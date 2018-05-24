import React from 'react'
import { Text, View } from 'react-native'
import { colors } from '~/styles'
import { Schedules } from '~/components'
import { parseTitle } from '~/utils/parse'

export default function ScheduleDirection (props) {
  const directionTitle = parseTitle(props.directionsInfo.get('sentido'))
  let weekDaysType = props.directionsInfo.keySeq().toArray()
  weekDaysType = weekDaysType.filter((item) => item !== 'sentido')

  return (
    <View>
      <View style={styles.directionTextContainer}>
        <Text style={styles.directionText}>
          Sentido: {directionTitle}
        </Text>
      </View>
      {weekDaysType.map((weekDayType, index) => (
        <View key={index}>
          <View style={styles.dayTypeContainer}>
            <Text style={styles.directionTitle}>{parseTitle(weekDayType)}</Text>
          </View>
          <Schedules key={index} schedules={props.directionsInfo.get(weekDayType)}/>
        </View>
      ))}
    </View>
  )
}

const styles = {
  directionTextContainer: {
    padding: 10,
    backgroundColor: '#eceff1',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  directionText: {
    fontSize: 15,
  },
  dayTypeContainer: {
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
}
