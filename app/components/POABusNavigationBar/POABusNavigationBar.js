import React, { PropTypes } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import NavigationBar from 'react-native-navbar'

POABusNavigationBar.propTypes = {
  title: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
}

export default function POABusNavigationBar (props) {

  return (
    <NavigationBar
      tintColor={'#F7F9F9'}
      title={{title: props.title}}
      leftButton={
        <TouchableOpacity onPress={props.onBack}>
          <Text style={{color: '#4A90E2', marginTop: 14}}>Fechar</Text>
        </TouchableOpacity>
      } />
  )

}
