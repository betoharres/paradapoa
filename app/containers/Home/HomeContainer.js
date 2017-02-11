import React, { PropTypes, Component } from 'react'
import { ListView, AsyncStorage } from 'react-native'
import { Home, Bus } from '~/components'
import busSchedules from '~/lib'
import immutable, { fromJS } from 'immutable'

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
      busSchedules: busSchedules,
      dataSource: this.ds.cloneWithRows(busSchedules.toArray()),
    }
  }

  handleSelectBus = async (code) => {
    this.props.navigator.push({busDetails: true, passProps: {code: code}})
  }

  handleSearchBus = (text) => {
    if (text.length > 0) {
      const searchedText = text.trim().toUpperCase()
      let filteredBuses = fromJS({})
      this.state.busSchedules.map((bus) => {
        const busName = bus.get('nome')
        const busCode = bus.get('code')
        if (busName.indexOf(searchedText) !== -1
            || busCode.indexOf(searchedText) !== -1) {
          filteredBuses = filteredBuses.merge({[bus.get('code')]: bus})
        }
      })
      this.setState({
        searchedText: text,
        dataSource: this.ds.cloneWithRows(filteredBuses.toArray())
      })
    } else {
      this.setState({
        searchedText: text,
        dataSource: this.ds.cloneWithRows(this.state.busSchedules.toArray())
      })
    }
  }

  renderRow = (bus) => {
    return <Bus name={bus.get('nome')} code={bus.get('code')}
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
