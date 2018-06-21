import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'

import { colors } from '~/styles'

BusItem.propTypes = {
  listId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  selectBus: PropTypes.func.isRequired,
}

export default function BusItem (props) {

  return (
    <ListItem
      key={props.listId}
      subtitle={props.name}
      title={props.code}
      underlayColor={colors.border}
      leftIcon={props.isFavorite ? {name: 'favorite', color: colors.red} : null}
      onPress={() => props.selectBus(props.code)} />
  )

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
