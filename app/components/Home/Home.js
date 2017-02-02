import React, { PropTypes } from 'react'
import { Text, View, StyleSheet, ListView } from 'react-native'

Home.propTypes = {
  dataSource: PropTypes.object.isRequired,
  renderRow: PropTypes.func.isRequired,
}

export default function Home (props) {

  return (
    <View style={styles.container}>
      <ListView renderRow={props.renderRow} dataSource={props.dataSource} />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
