import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, Dimensions, StyleSheet, Platform, VirtualizedList } from 'react-native'
import { colors, fontSizes } from '~/styles'
import { List } from 'immutable'

const { width } = Dimensions.get('window')
const SCHEDULE_ITEM_WIDTH = (width * 0.26)

Schedules.propTypes = {
  schedules: PropTypes.instanceOf(List),
}

export default function Schedules (props) {

  setBackgroundColor = (schedule) => {
    return schedule.get('cadeirante') ? {backgroundColor: 'rgba(3, 169, 244, 0.08)'} : {}
  }


  return (
    <View style={styles.schedulesContainer}>
      <VirtualizedList
        data={props.schedules}
        initialNumToRender={60}
        getItem={(data, index) => {
          let items = []
          for (let i = 0; i < 3; i++) {
            const item = data.get(index * 3 + i)
            item && items.push(item)
          }
          return items
        }}
        getItemCount={(data) => data.size}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <View key={index} style={styles.scheduleItemContainer}>
              {item.map((elem, i) => (
                <View key={i} style={[styles.scheduleItem, this.setBackgroundColor(elem)]}>
                  <Text key={i}>{elem.get('horario')}</Text>
                </View>
              ))}
            </View>
          )
        }}
      />
    </View>
  )

}

const styles = StyleSheet.create({
  schedulesContainer: {
    alignItems: 'center',
    marginBottom: 70,
  },
  scheduleItemContainer: {
    flexDirection: 'row',
  },
  scheduleItem: {
    width: SCHEDULE_ITEM_WIDTH,
    padding: 10,
    maxHeight: 40,
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: colors.border,
  },
})
