import React, { PropTypes } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'

import { colors } from '~/styles'

Bus.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  selectBus: PropTypes.func.isRequired,
}

export default function Bus (props) {

  return (
    <ListItem
      key={props.listId}
      subtitle={props.name}
      title={props.code}
      onPress={() => props.selectBus(props.code)}/>
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
