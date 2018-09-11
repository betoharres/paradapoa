import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ListView } from 'react-native'
import { Home, BusItem } from '~/components'
import busSchedules from '~/lib'
import immutable, { fromJS, Map } from 'immutable'
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
      badgeDirection: Map({}),
      flashNotificationText: '',
      showFlashNotification: false,
      refreshing: false,
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
    if (bus.get('sentidos').size > 1) {
      const direction = this.state.badgeDirection.get(bus.get('numero')) ? 0 : 1
      this.setState({
        showFlashNotification: true,
        badgeDirection: this.state.badgeDirection.merge({[bus.get('numero')]: direction}),
        flashNotificationText: parseDirection(bus.getIn(['sentidos', direction])),
      })
    } else {
      this.setState({
        showFlashNotification: true,
        flashNotificationText: parseDirection(bus.getIn(['sentidos', 0])),
      })
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true})
    this.forceUpdate()
    this.setState({refreshing: false})
  }

  renderRow = ([code, bus], x, index) => {
    return <BusItem
              listId={index}
              bus={bus}
              selectBus={this.handleSelectBus}
              toogleDirection={this.handleToogleDirection}
              indexDirection={this.state.badgeDirection.get(code) || 0}
              isFavorite={this.state.bookmarks.has(bus.get('numero'))} />
  }

  render () {
    return (
      <Home
        renderRow={this.renderRow}
        hasBookmarks={this.state.bookmarks.size > 0}
        dataSource={this.state.dataSource}
        refreshing={this.state.refreshing}
        searchText={this.state.searchedText}
        onHideNotification={this.handleHideFlashNotification}
        showNotification={this.state.showFlashNotification}
        notificationText={this.state.flashNotificationText}
        onSearchBus={(text) => this.handleDisplayBuses(text)}
        onRefresh={() =>  this._onRefresh()} />
    )
  }
}

