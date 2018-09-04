import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ListView } from 'react-native'
import { Home, BusItem } from '~/components'
import busSchedules from '~/lib'
import immutable, { fromJS } from 'immutable'
import { getSavedBuses, filterBusesByText, filterBusesByArray } from '~/storage/api'
import { parseDirection } from '~/utils/parse'

export default class HomeContainer extends PureComponent {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    header: null,
    headerStyle: {
      backgroundColor: 'transparent',
    },
  }

  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => !immutable.is(r1, r2)})
    this.state = {
      searchedText: '',
      bookmarks: fromJS({}),
      dataSource: this.ds.cloneWithRows([]),
      isFocused: true,
      scheduleDirection: 0,
      flashNotificationText: '',
      showFlashNotification: false,
    }

    // react-navigation does not unmount after changing screen,
    // so this is the code that would be inside componentDidMount
    this.willFocusListener = this.props.navigation.addListener('willFocus', async () => {
      const bookmarksKeys = Object.keys(await getSavedBuses())
      const bookmarks = filterBusesByArray(bookmarksKeys)

      this.handleDisplayBuses(this.state.searchedText, bookmarks)
    })

    this.didBlurListener = this.props.navigation.addListener('didBlur', () => {
      clearTimeout(this.timeout)
      this.setState({isFocused: false})
    })
  }

  componentWillUnmount () {
    this.willFocusListener.remove()
  }

  handleDisplayBuses = (searchedText = '', bookmarks = this.state.bookmarks) => {
    if (searchedText.length > 0)
      var busList = filterBusesByText(searchedText)
    else
      var busList = bookmarks.size > 0 ? bookmarks : busSchedules

    this.setState({
      isFocused: true,
      searchedText,
      bookmarks,
      dataSource: this.ds.cloneWithRows(busList.toArray()),
    })
  }

  handleSelectBus = (code) => {
    this.timeout = setTimeout(() => this.props.navigation.navigate('BusDetails', {code}), 120)
  }

  handleHideFlashNotification = () => {
    this.setState({
      showFlashNotification: false
    })
  }

  handleToogleDirection = (bus) => {
    let scheduleDirection = this.state.scheduleDirection ? 0 : 1
    scheduleDirection = bus.getIn(['sentidos', scheduleDirection]) ? scheduleDirection : 0
    this.setState({
      showFlashNotification: true,
      scheduleDirection,
      flashNotificationText: parseDirection(bus.getIn(['sentidos', scheduleDirection])),
    })
  }

  renderRow = ([code, bus], x, index) => {
    return <BusItem
              listId={index}
              bus={bus}
              selectBus={this.handleSelectBus}
              toogleDirection={this.handleToogleDirection}
              scheduleDirection={this.state.scheduleDirection}
              isFavorite={this.state.bookmarks.has(bus.get('numero'))} />
  }

  render () {
    return (
      <Home
        renderRow={this.renderRow}
        dataSource={this.state.dataSource}
        searchText={this.state.searchedText}
        onHideNotification={this.handleHideFlashNotification}
        showNotification={this.state.showFlashNotification}
        notificationText={this.state.flashNotificationText}
        onSearchBus={(text) => this.handleDisplayBuses(text)} />
    )
  }
}

