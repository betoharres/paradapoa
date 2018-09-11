import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, ListView, Platform, TextInput, RefreshControl } from 'react-native'
import { SearchBar, List } from 'react-native-elements'
import { colors } from '~/styles'
import { Footer } from '~/components'
import { FlashNotification } from '~/components'

Home.propTypes = {
  dataSource: PropTypes.object.isRequired,
  renderRow: PropTypes.func.isRequired,
  onSearchBus: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  refreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  hasBookmarks: PropTypes.bool.isRequired,
}

export default function Home (props) {

  return (
    <View style={Platform.OS === 'android' ? styles.containerAndroid : styles.containerIOS}>
      {props.showNotification
          ? <FlashNotification
              top={Platform.OS === 'android' ? 60 : 48}
              text={props.notificationText}
              onHideNotification={props.onHideNotification} />
          : null}
      <SearchBar
        lightTheme
        round
        clearIcon={props.searchText.length > 0 ? true : false}
        autoCorrect={false}
        onChangeText={props.onSearchBus}
        inputStyle={{backgroundColor: 'white'}}
        placeholder={'Pesquisar'}
        textInputRef={'SeachBus'}
        value={props.searchText} />
      <ListView
        renderRow={props.renderRow}
        dataSource={props.dataSource}
        refreshControl={
          props.hasBookmarks
          ? <RefreshControl
              refreshing={props.refreshing}
              onRefresh={props.onRefresh} />
          : null
        }
        enableEmptySections={true} />
        { Platform.OS === 'android' ? <Footer /> : null }
    </View>
  )

}

const styles = StyleSheet.create({
  containerIOS: {
    flex: 1,
    marginTop: 25,
    backgroundColor: 'white',
  },
  containerAndroid: {
    flex: 1,
    backgroundColor: 'white',
  },
  textInput: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 40,
    height: 40,
    borderColor: colors.border,
    borderWidth: 1,
  }
})
