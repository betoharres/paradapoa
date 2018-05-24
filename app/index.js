import React, { Component } from 'react'
import { View } from 'react-native'
import { POABusNavigator } from './containers'

export default class App extends Component<{}> {

  render() {
    return (
      <View style={{flex: 1}}>
        <POABusNavigator />
      </View>
    )
  }
}
