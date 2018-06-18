import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListView, AsyncStorage } from 'react-native'
import { Home, Bus } from '~/components'
import busSchedules from '~/lib'
import immutable, { fromJS } from 'immutable'
import { getSavedBuses, filterBusesByText, filterBusesByArray } from '~/storage/api'

export default class HomeContainer extends Component {

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
      dataSource: this.ds.cloneWithRows(busSchedules.toArray()),
    }
  }

  async componentDidMount () {
    let bookmarks = Object.keys(await getSavedBuses())
    if (bookmarks.length > 0) {
      bookmarks = filterBusesByArray(bookmarks, busSchedules)
      this.setState({dataSource: this.ds.cloneWithRows(bookmarks.toArray()), bookmarks})
    }
  }

  // async componentDidUpdate () {
  //   let bookmarks = await getSavedBuses()
  //   bookmarks = Object.keys(bookmarks)
  //   if (bookmarks.length !== this.state.bookmarks.size) {
  //     if (this.state.searchedText.length > 0) {
  //       const filteredBuses = filterBusesByText(this.state.searchedText, busSchedules)
  //       this.setState({
  //         dataSource: this.ds.cloneWithRows(filteredBuses.toArray())
  //       })
  //     } else {
  //       if (bookmarks.length > 0) {
  //         bookmarks = filterBusesByArray(bookmarks, busSchedules)
  //         this.setState({dataSource: this.ds.cloneWithRows(bookmarks.toArray()), bookmarks})
  //       } else {
  //         this.setState({dataSource: this.ds.cloneWithRows(busSchedules.toArray()), bookmarks: fromJS({})})
  //       }
  //     }
  //   }
  // }

  handleSelectBus = async (code) => {
    this.props.navigation.navigate('BusDetails', {code})
  }

  handleSearchBus = (text) => {
    if (text.length > 0) {
      const filteredBuses = filterBusesByText(text, busSchedules)
      this.setState({
        searchedText: text,
        dataSource: this.ds.cloneWithRows(filteredBuses.toArray())
      })
    } else {
      this.clearBusList()
    }
  }

  renderRow = (bus, listId) => {
    const { bookmarks } = this.state
    const isFavorite = bookmarks.size > 0 ? bookmarks.has(bus.get('numero')) : false

    return <Bus listId={listId}
                isFavorite={isFavorite}
                name={bus.get('nome')}
                code={bus.get('numero')}
                selectBus={this.handleSelectBus} />
  }

  clearBusList (searchedText = '') {
    const { bookmarks } = this.state

    const busList = bookmarks.size > 0 ? bookmarks : busSchedules
    this.setState({dataSource: this.ds.cloneWithRows(busList.toArray()), searchedText})
  }

  render () {
    return (
      <Home
        renderRow={this.renderRow}
        dataSource={this.state.dataSource}
        searchText={this.state.searchedText}
        onSearchBus={(text) => this.handleSearchBus(text)} />
    )
  }
}

