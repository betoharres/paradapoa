import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem, Badge } from 'react-native-elements'
import { getNextSchedule } from '~/utils/time'

import { colors } from '~/styles'
import { Map } from 'immutable'

BusItem.propTypes = {
  listId: PropTypes.string.isRequired,
  bus: PropTypes.instanceOf(Map),
  isFavorite: PropTypes.bool.isRequired,
  selectBus: PropTypes.func.isRequired,
  indexDirection: PropTypes.number.isRequired,
  toogleDirection: PropTypes.func.isRequired,
}

export default function BusItem (props) {
  let nextSchedule = null
  const badgeColor = props.indexDirection
    ? {text: 'black', bg: 'orange'}
    : {text: 'white', bg: 'black'}

  if (props.isFavorite)
    nextSchedule = getNextSchedule(props.bus.get('horarios'), props.bus.getIn(['sentidos', props.indexDirection]))
    if (nextSchedule)
      nextSchedule = nextSchedule.get('horario')

  return (
    <ListItem
      key={props.listId}
      subtitle={props.bus.get('nome')}
      title={props.bus.get('numero')}
      underlayColor={colors.border}
      leftIcon={props.isFavorite ? {name: 'favorite', color: colors.red} : null}
      badge={props.isFavorite && nextSchedule ? {element:
        <Badge
          containerStyle={{backgroundColor: badgeColor['bg']}}
          onPress={() => props.toogleDirection(props.bus)}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={{color: badgeColor['text']}}>{nextSchedule}</Text>
            </View>
          </Badge>}
      : null}
      onPress={() => props.selectBus(props.bus.get('numero'))} />)

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})
