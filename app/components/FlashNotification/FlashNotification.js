import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')
const NOTIFICATION_WIDTH = width * 0.7

class FlashNotification extends Component {

  static propTypes = {
    length: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    onHideNotification: PropTypes.func.isRequired,
  }

  static defaultProps = {
    length: 2000,
    text: '',
  }

  state = {
    width: new Animated.Value(50),
    opacity: new Animated.Value(0.7),
    textOpacity: new Animated.Value(0),
  }

  componentDidMount () {
    Animated.spring(this.state.width, {toValue: NOTIFICATION_WIDTH}).start()
    Animated.timing(this.state.textOpacity, {toValue: 1, duration: 1000}).start()
    this.timeout = setTimeout(() => {
      Animated.timing(this.state.opacity, {toValue: 0, duration: 1000}).start(
        this.props.onHideNotification
      )
    }, this.props.length)
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  getStyles = () => {
    return {
      width: this.state.width,
      opacity: this.state.opacity,
    }
  }

  render () {
    return (
      <Animated.View style={[styles.container, this.getStyles()]}>
        <Animated.Text style={[styles.text, {opacity: this.state.textOpacity}]}>
          {this.props.text}
        </Animated.Text>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    borderRadius: 5,
    height: 35,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    top: 43,
    left: (width - NOTIFICATION_WIDTH) / 2,
  },
  text: {
    color: 'white',
  },
})

export default FlashNotification
