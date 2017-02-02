import React, { PropTypes, Component } from 'react'
import { Navigator } from 'react-native'
import { HomeContainer } from '~/containers'

class POABusNavigator extends Component {

  renderScene = (route, navigator) => {
    return <HomeContainer navigator={navigator} />
  }

  configureScene = () => {
  }

  render () {
    return (
      <Navigator
        renderScene={this.renderScene}
        configureScene={this.configureScene} />
    )
  }
}

export default POABusNavigator
