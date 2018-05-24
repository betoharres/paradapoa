import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Platform } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'
import { HomeContainer, BusDetailsContainer } from '~/containers'

export default class POABusNavigator extends Component {

  renderScene = (route, navigator) => {
    if (route.home === true) {
      return <HomeContainer navigator={navigator} />
    } else {
      return <BusDetailsContainer code={route.passProps.code} navigator={navigator} />
    }
  }

  configureScene = (route) => {
    if (route.home === true) {
      return Navigator.SceneConfigs.FloatFromLeft
    } else {
      return Navigator.SceneConfigs.FloatFromRight
    }
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

