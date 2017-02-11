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
        flashNotificationText: `Onibus ${this.props.code} ${actionWord} com sucesso`,
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
        {this.state.showFlashNotification
            ? <FlashNotification text={this.state.flashNotificationText}
                onHideNotification={this.handleHideFlashNotification} /> : null}
        <BusDetails code={this.state.code} name={this.state.name}
          schedules={this.state.schedules} saveBus={this.handleSaveBus}
          onBack={this.props.navigator.pop} onSaveBus={this.handleSaveBus}
          isFavorite={this.state.isFavorite} />
      </View>
    )
  }
}

export default BusDetailsContainer
