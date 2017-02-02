import React, { PropTypes, Component } from 'react'
import { ListView } from 'react-native'
import { Home, Bus } from '~/components'
import busSchedules from '~/lib'

class HomeContainer extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {
      dataSource: this.ds.cloneWithRows(busSchedules),
    }
  }

  renderRow = ({code, nome, horarios}) => {
    return <Bus nome={nome} code={code} />
  }

  render () {
    console.log(this.state.dataSource)
    return (
      <Home renderRow={this.renderRow} dataSource={this.state.dataSource} />
    )
  }
}

export default HomeContainer
