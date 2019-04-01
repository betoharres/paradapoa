import React, { Component } from 'react'
import { View } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { HomeContainer, BusDetailsContainer } from './containers'

// https://github.com/facebook/react-native/issues/18868
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Class RCTCxxModule'])

const AppNavigator = createStackNavigator({
  Home: HomeContainer,
  BusDetails: BusDetailsContainer,
});
const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component<{}> {

  render() {
    return (
      <View style={{flex: 1}}>
        <AppContainer />
      </View>
    )
  }
}
