import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import { POABusNavigator } from '~/containers'

class AppContainer extends Component {

  render () {
    return (
      <View style={{flex: 1}}>
        <POABusNavigator />
      </View>
    )
  }
}

export default AppContainer
