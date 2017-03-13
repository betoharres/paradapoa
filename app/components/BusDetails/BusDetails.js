import React, { PropTypes } from 'react'
import { Text, View, TouchableOpacity,
         StyleSheet, Platform, Dimensions, ScrollView } from 'react-native'
import { POABusNavigationBar } from '~/components'
import { colors, fontSizes } from '~/styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
const { width } = Dimensions.get('window')
const SCHEDULE_ITEM_WIDTH = (width * 0.25)

BusDetails.propTypes = {
  onBack: PropTypes.func.isRequired,
  onSaveBus: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  schedules: PropTypes.object.isRequired,
  saveBus: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
}

export default function BusDetails (props) {

  function Schedules (props) {
    return (
      <View>
        {props.schedules.map((schedule, index) => (
          <View style={styles.scheduleItem} key={index}>
            <Text>{schedule.getIn([0,0]) + ':' + schedule.getIn([0,1])}</Text>
          </View>
        ))}
      </View>
    )
  }

  function ScheduleDirection (props) {
    let scheduleDirections = props.directionsInfo.keySeq().toArray()
    scheduleDirections = scheduleDirections.filter((item) => item !== 'sentido')
    return (
      <View>
        <View>
          <Text>{props.directionsInfo.get('sentido')}</Text>
        </View>
        {scheduleDirections.map((scheduleDirection, index) => (
          <View key={index}>
            <Text>{scheduleDirection}</Text>
            <Schedules key={index} schedules={props.directionsInfo.get(scheduleDirection)}/>
          </View>
        ))}
      </View>
    )
  }

  function Directions (props) {
    const directions = props.busInfo.keySeq().toArray()
    return (
      <View>
        {directions.map((direction, index) => (
          <ScheduleDirection key={index} directionsInfo={props.busInfo.get(direction)} />
        ))}
      </View>
    )
  }

  return (
    <View>
      <POABusNavigationBar title={`Horários do ${props.code}`}
        leftButton={
          <TouchableOpacity onPress={props.onBack}>
            <Text style={{color: '#4A90E2'}}>Fechar</Text>
          </TouchableOpacity>
        } rightButton={
          <TouchableOpacity style={styles.saveBusBtn} onPress={props.onSaveBus}>
            <Icon name={`favorite${props.isFavorite ? '' : '-border'}`}
              color={colors.red} size={20}/>
          </TouchableOpacity>
        }
      />
      <View style={styles.titleContainer}>
        <Text style={[styles.title, {fontFamily: Platform.OS === 'android'
          ? 'Roboto' : 'Helvetica Neue'}]}>{props.name}</Text>
      </View>
      <ScrollView>
        <View style={styles.schedulesContainer}>
          <Directions busInfo={props.schedules} />
        </View>
      </ScrollView>
    </View>
  )

}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginTop: 15,
    paddingBottom: 15,
    borderBottomColor: colors.border,
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: fontSizes.primary,
  },
  schedulesContainer: {
    margin: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  scheduleItem: {
    width: (SCHEDULE_ITEM_WIDTH - 10),
    padding: 10,
    maxHeight: 40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 7,
    borderColor: colors.border,
  }
})
