import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { BusDetails, FlashNotification } from '~/components'
import { toggleSaveBus, getSavedBuses } from '~/storage/api'
import busSchedules from '~/lib'

export default class BusDetailsContainer extends Component {

  static navigationOptions = {
    header: null,
  }

  constructor (props) {
    super(props)
    this.state = {
      code: props.navigation.getParam('code', null),
      name: busSchedules.getIn([props.navigation.getParam('code'), 'nome']),
      schedules: busSchedules.getIn([props.navigation.getParam('code'), 'horarios']),
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
        flashNotificationText: `Onibus ${this.state.code} ${actionWord}`,
      })
    } catch (e) {
      this.setState({
        showFlashNotification: true,
        flashNotificationText: `Erro ao salvar o onibus ${this.state.code}`,
      })
    }
  }

  render () {
    return (
      <BusDetails
        code={this.state.code}
        name={this.state.name}
        schedules={this.state.schedules}
        onBack={() => this.props.navigation.goBack()}
        isFavorite={this.state.isFavorite}
        onHideNotification={this.handleHideFlashNotification}
        showNotification={this.state.showFlashNotification}
        notificationText={this.state.flashNotificationText}
        onSaveBus={this.handleSaveBus} />
    )
  }
}

