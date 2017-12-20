import React, { PropTypes, Component } from 'react'
import { View } from 'react-native'
import { BusDetails, FlashNotification } from '~/components'
import { toggleSaveBus, getSavedBuses } from '~/storage/api'
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
      isFavorite: false,
      showFlashNotification: false,
      flashNotificationText: '',
    }
  }

  async componentDidMount () {
    const savedBuses = await getSavedBuses()
    this.setState({
      isFavorite: savedBuses[this.state.code] ? true : false
    })
  }

  handleHideFlashNotification = () => {
    this.setState({
      showFlashNotification: false
    })
  }

  handleSaveBus = async () => {
    try {
      await toggleSaveBus(this.state.code)
      const actionWord = this.state.isFavorite ? 'removido' : 'salvo'
      this.setState({
        isFavorite: !this.state.isFavorite,
        showFlashNotification: true,
        flashNotificationText: `Onibus ${this.props.code} ${actionWord}`,
      })
    } catch (e) {
      this.setState({
        showFlashNotification: true,
        flashNotificationText: `Erro ao salvar o onibus ${this.props.code}`,
      })
    }
  }

  render () {
    return (
      <View>
        <BusDetails
          code={this.state.code}
          name={this.state.name}
          saveBus={this.handleSaveBus}
          schedules={this.state.schedules}
          onBack={this.props.navigator.pop}
          isFavorite={this.state.isFavorite}
          onHideNotification={this.handleHideFlashNotification}
          showNotification={this.state.showFlashNotification}
          notificationText={this.state.flashNotificationText}
          onSaveBus={this.handleSaveBus} />
      </View>
    )
  }
}

export default BusDetailsContainer
