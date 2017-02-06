import React, { PropTypes, Component } from 'react'
import { Navigator, Platform } from 'react-native'
import { HomeContainer, BusDetailsContainer } from '~/containers'

class POABusNavigator extends Component {

  renderScene = (route, navigator) => {
    if (route.home === true) {
      return <HomeContainer navigator={navigator} />
    } else {
      return <BusDetailsContainer code={route.passProps.code}
                navigator={navigator} />
    }
  }

  configureScene = (route) => {
    if (Platform.OS === 'android') {
      return Navigator.SceneConfigs.FloatFromBottomAndroid
    }
    if (route.busDetails === true) {
      return Navigator.SceneConfigs.FloatFromBottom
    }
    return Navigator.SceneConfigs.FloatFromRight
  }

  render () {
    return (
      <Navigator
        initialRoute={{home: true}}
        renderScene={this.renderScene}
        configureScene={this.configureScene} />
    )
  }
}

export default POABusNavigator
