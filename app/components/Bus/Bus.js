import React, { PropTypes } from 'react'
import { Text, View, StyleSheet } from 'react-native'

Bus.propTypes = {
  nome: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
}

export default function Bus (props) {

  return (
    <View style={styles.container}>
      <Text>{props.code} - {props.nome}</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#E4E4E4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})
