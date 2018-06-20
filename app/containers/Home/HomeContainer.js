import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ListView, AsyncStorage } from 'react-native'
import { Home, Bus } from '~/components'
import busSchedules from '~/lib'
import immutable, { fromJS } from 'immutable'
import { getSavedBuses, filterBusesByText, filterBusesByArray } from '~/storage/api'

export default class HomeContainer extends PureComponent {

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
    }

    // react-navigation does not unmount after changing screen,
    // so this is the code that would be inside componentDidMount
    this.subs = this.props.navigation.addListener('willFocus', async () => {
      const bookmarksKeys = Object.keys(await getSavedBuses())

      if (bookmarksKeys.length > 0) {
        const bookmarks = filterBusesByArray(bookmarksKeys, busSchedules)
        this.setState({ bookmarks })
      } else {
        this.setState({ bookmarks: fromJS({}) })
      }
      this.handleDisplayBuses(this.state.searchedText)
    })
  }

  componentWillUnmount () {
    this.subs.remove()
  }

  handleSelectBus = async (code) => {
    this.props.navigation.navigate('BusDetails', {code})
  }

  handleDisplayBuses = (searchedText) => {
    if (searchedText.length > 0) {
      const searchedBuses = filterBusesByText(searchedText, busSchedules).toArray()
      this.setState({ searchedText, dataSource: this.ds.cloneWithRows(searchedBuses) })
    } else {
      const { bookmarks } = this.state
      const busList = bookmarks.size > 0 ? bookmarks : busSchedules
      this.setState({ searchedText, dataSource: this.ds.cloneWithRows(busList.toArray()) })
    }
  }

  renderRow = (bus, listId) => {

    return <Bus listId={listId}
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

