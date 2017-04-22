import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import { POABusNavigator } from '~/containers'
import { PreSplash } from '~/components'

class AppContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      splashTimes: 2,
    }
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.setState({
        splashTimes: (this.state.splashTimes - 1)
      })}, 750)
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.splashTimes === 0) {window.clearInterval(this.interval)}
  }

  render () {
    return (
      <View style={{flex: 1}}>
        {this.state.splashTimes > 0
          ? <PreSplash />
          : <POABusNavigator />}
      </View>
    )
  }
}

export default AppContainer
