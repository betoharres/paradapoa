import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ListView } from 'react-native'
import { Home, BusItem } from '~/components'
import busSchedules from '~/lib'
import immutable, { fromJS } from 'immutable'
import { getSavedBuses, filterBusesByText, filterBusesByArray } from '~/storage/api'

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
    }

    // react-navigation does not unmount after changing screen,
    // so this is the code that would be inside componentDidMount
    this.willFocusListener = this.props.navigation.addListener('willFocus', async () => {
      const bookmarksKeys = Object.keys(await getSavedBuses())
      const bookmarks = filterBusesByArray(bookmarksKeys)

      this.handleDisplayBuses(this.state.searchedText, bookmarks)
    })

    this.didBlurListener = this.props.navigation.addListener('didBlur', () => {
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
    setTimeout(() => this.props.navigation.navigate('BusDetails', {code}), 120)
  }

  renderRow = (bus, index) => {

    return <BusItem
              listId={index}
              name={bus.get('nome')}
              code={bus.get('numero')}
              selectBus={this.handleSelectBus}
              isFavorite={this.state.bookmarks.has(bus.get('numero'))} />
  }

  render () {
    return (
      <Home
        renderRow={this.renderRow}
        dataSource={this.state.dataSource}
        searchText={this.state.searchedText}
        onSearchBus={(text) => this.handleDisplayBuses(text)} />
    )
  }
}

