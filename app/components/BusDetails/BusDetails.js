import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { colors, fontSizes } from '~/styles'
import { parseDirection, parseTitle } from '~/utils/parse'
import { VirtualizedList, FlatList } from 'react-native'
import { Card, Badge } from 'react-native-elements'

import fromJS from 'immutable'

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native'

import {
  POABusNavigationBar,
  FlashNotification,
  BusInfo,
  NavbarDetails,
} from '~/components'

const { width } = Dimensions.get('window')
const SCHEDULE_ITEM_WIDTH = (width * 0.26)

BusDetails.propTypes = {
  onBack: PropTypes.func.isRequired,
  onSaveBus: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  schedules: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool.isRequired,
}

export default function BusDetails (props) {

  setBackgroundColor = (schedule) => {
    return schedule.get('cadeirante') ? {backgroundColor: 'rgba(3, 169, 244, 0.08)'} : {}
  }

  function Schedules (props) {
    return (
      <View style={styles.schedulesContainer}>
        <VirtualizedList
          data={props.schedules}
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
              <View key={index} style={{flexDirection: 'row'}}>
                {item.map((elem, i) => (
                  <View key={i} style={[styles.scheduleItem, this.setBackgroundColor(elem)]}>
                    <Text key={i} style={styles.scheduleTime}>{elem.get('horario')}</Text>
                  </View>
                ))}
              </View>
            )
          }}
        />
      </View>
    )
  }

  function ScheduleDirection (props) {
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

  function BusSchedules (props) {
    const directions = props.busInfo.keySeq().toArray()
    return directions.map((direction, index) => (
            <ScheduleDirection key={index} directionsInfo={props.busInfo.get(direction)} counter={++index} />
           ))
  }

  return (
    <View style={styles.container}>
      <POABusNavigationBar title={`Horários de ${props.code}`}
        leftButton={
          <TouchableOpacity onPress={props.onBack}>
            <EntypoIcon name='chevron-thin-left' color={colors.blue} size={14}>
              <Text style={styles.backText}>Voltar</Text>
            </EntypoIcon>
          </TouchableOpacity>
        } rightButton={
          <TouchableOpacity
            onPress={props.onSaveBus}
            hitSlop={{ top: 25, bottom: 75, right: 25, left: 40 }}>
            <Icon
              name={`favorite${props.isFavorite ? '' : '-border'}`}
              color={colors.red}
              size={20} />
          </TouchableOpacity>
        }
      />
      {props.showNotification
          ? <FlashNotification
              text={props.notificationText}
              onHideNotification={props.onHideNotification} />
          : null}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.name}</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <BusSchedules busInfo={props.schedules} />
      </ScrollView>
    </View>
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
