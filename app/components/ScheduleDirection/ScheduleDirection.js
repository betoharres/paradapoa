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
    <Card title={directionTitle} wrapperStyle={styles.cardStyle}>
      {weekDaysType.map((weekDayType, index) => (
        <View key={index}>
          <View style={styles.dayTypeContainer}>
            <Badge key={index} style={styles.directionTitle} value={parseTitle(weekDayType)} />
          </View>
          <Schedules key={index} schedules={props.directionsInfo.get(weekDayType)}/>
        </View>
      ))}
    </Card>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 117,
  },
  container: {
    backgroundColor: 'white',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 15,
    paddingBottom: 15,
    borderBottomColor: colors.border,
    borderBottomWidth: 0.5,
    width: '100%',
  },
  title: {
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica Neue',
    textAlign: 'center',
    fontSize: fontSizes.primary,
  },
  schedulesContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: 70,
    width: '100%',
  },
  scheduleItem: {
    width: SCHEDULE_ITEM_WIDTH,
    padding: 10,
    maxHeight: 40,
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: colors.border,
  },
  scheduleTime: {
  },
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
  backText: {
    color: '#4A90E2',
  },
  dayTypeContainer: {
    padding: 10,
    alignItems: 'center',
  },
  cardStyle: {
    alignContent: 'center',
    marginLeft: Platform.OS === 'android' ? '2%' : '3%',
  }
})
