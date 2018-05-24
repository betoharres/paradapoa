import React, { PureComponent } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { colors } from '~/styles'

const { width } = Dimensions.get('window')
const SCHEDULE_ITEM_WIDTH = (width * 0.25)

export default class Schedules extends PureComponent {

  setBackgroundColor = (schedule) => {
    return schedule.get('cadeirante') ? {backgroundColor: 'rgba(3, 169, 244, 0.08)'} : {}
  }

  render () {
    return (
      <View style={styles.schedulesContainer}>
        {props.schedules.map((schedule, index) => (
          <View key={index} style={[styles.scheduleItemContainer, this.setBackgroundColor(schedule)]}>
            <Text key={index} style={styles.scheduleTime}>{schedule.get('horario')}</Text>
          </View>
        ))}
      </View>
    )
  }
}

const styles = {
  schedulesContainer: {
    margin: 20,
    marginBottom: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  scheduleItemContainer: {
    width: (SCHEDULE_ITEM_WIDTH - 10),
    padding: 10,
    maxHeight: 40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 7,
    borderColor: colors.border,
  },
  scheduleTime: {
  },
  scheduleIcon: {
  },
}
