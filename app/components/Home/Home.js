import React, { PropTypes } from 'react'
import { View, StyleSheet, ListView, Platform, TextInput } from 'react-native'
import { colors } from '~/styles'

Home.propTypes = {
  dataSource: PropTypes.object.isRequired,
  renderRow: PropTypes.func.isRequired,
  onSearchBus: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
}

export default function Home (props) {

  return (
    <View style={Platform.OS === 'android' ? styles.containerAndroid : styles.containerIOS}>
      <TextInput autoCorrect={false} onChangeText={props.onSearchBus} style={styles.textInput}
        autoFocus={true} value={props.searchText} />
      <ListView renderRow={props.renderRow} dataSource={props.dataSource}
        enableEmptySections={true} />
    </View>
  )

}

const styles = StyleSheet.create({
  containerIOS: {
    flex: 1,
    marginTop: 15,
  },
  containerAndroid: {
    flex: 1,
  },
  textInput: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 15,
    height: 40,
    borderColor: colors.border,
    borderWidth: 1,
  }
})
