import React, { PropTypes } from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export default function PreSplash (props) {

  return (
    <View>
      <Image style={{width: width, height: height}} source={require('../../images/splash.png')} />
    </View>
  )

}

const styles = StyleSheet.create({
})
