import React, { PropTypes, Component } from 'react'
import { ListView, AsyncStorage } from 'react-native'
import { Home, Bus } from '~/components'
import busSchedules from '~/lib'
import immutable, { fromJS } from 'immutable'
import { getSavedBuses, filterBusesByText,
         filterBusesByArray } from '~/storage/api'

class HomeContainer extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !immutable.is(r1 , r2)
    })
    this.state = {
      searchedText: '',
      bookmarks: fromJS({}),
      shouldUpdate: props.shouldUpdate,
      dataSource: this.ds.cloneWithRows([]),
    }
  }

  async componentDidMount () {
    let bookmarks = await getSavedBuses()
    bookmarks = Object.keys(bookmarks)
    if (bookmarks.length > 0) {
      bookmarks = filterBusesByArray(bookmarks, busSchedules)
      this.setState({dataSource: this.ds.cloneWithRows(bookmarks.toArray()), bookmarks})
    } else {
      this.setState({dataSource: this.ds.cloneWithRows(busSchedules.toArray())})
    }
  }

  async componentWillUpdate () {
    let bookmarks = await getSavedBuses()
    bookmarks = Object.keys(bookmarks)
    if (bookmarks.length !== this.state.bookmarks.size) {
      if (this.state.searchedText.length > 0) {
        const filteredBuses = filterBusesByText(this.state.searchedText, busSchedules)
        this.setState({
          dataSource: this.ds.cloneWithRows(filteredBuses.toArray())
        })
      } else {
        if (bookmarks.length > 0) {
          bookmarks = filterBusesByArray(bookmarks, busSchedules)
          this.setState({dataSource: this.ds.cloneWithRows(bookmarks.toArray()), bookmarks})
        } else {
          this.setState({dataSource: this.ds.cloneWithRows(busSchedules.toArray()), bookmarks: fromJS({})})
        }
      }
    }
  }

  handleSelectBus = async (code) => {
    this.props.navigator.push({busDetails: true, passProps: {code: code}})
  }

  handleSearchBus = (text) => {
    if (text.length > 0) {
      const filteredBuses = filterBusesByText(text, busSchedules)
      this.setState({
        searchedText: text,
        dataSource: this.ds.cloneWithRows(filteredBuses.toArray())
      })
    } else {
      const busList = this.state.bookmarks.size > 0
        ? this.state.bookmarks.toArray() : busSchedules.toArray()
      this.setState({
        searchedText: text,
        dataSource: this.ds.cloneWithRows(busList)
      })
    }
  }

  renderRow = (bus, listId) => {
    return <Bus listId={listId}
                isFavorite={this.state.bookmarks.has(bus.get('numero'))}
                name={bus.get('nome')}
                code={bus.get('numero')}
                selectBus={this.handleSelectBus} />
  }

  render () {
    return (
      <Home renderRow={this.renderRow} dataSource={this.state.dataSource}
        searchText={this.state.searchedText}
        onSearchBus={(text) => this.handleSearchBus(text)} />
    )
  }
}

export default HomeContainer
