import React, { PropTypes, Component } from 'react'
import { View } from 'react-native'
import { BusDetails } from '~/components'
import { toggleSaveBus } from '~/storage/api'
import busSchedules from '~/lib'

class BusDetailsContainer extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      code: props.code,
      name: busSchedules.getIn([props.code, 'nome']),
      schedules: busSchedules.getIn([props.code, 'horarios']),
    }
  }

  handleSaveBus = async () => {
    await toggleSaveBus(this.state.code)
  }

  render () {
    return (
      <View>
        <BusDetails code={this.state.code} name={this.state.name}
          schedules={this.state.schedules} saveBus={this.handleSaveBus}
          onBack={this.props.navigator.pop} onSaveBus={this.handleSaveBus} />
      </View>
    )
  }
}

export default BusDetailsContainer
