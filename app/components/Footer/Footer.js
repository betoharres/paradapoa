import React from 'react'
import { Text, Linking, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '~/styles'

export default function Footer (props) {

  return (
    <View style={styles.container}>
      <Text style={styles.textFooter} onPress={() => Linking.openURL('http://github.com/betoharres')}>
        Feito com <Icon style={styles.icon} name='favorite' size={12} color={colors.red}/> por @betoharres</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
    height: 20,
  },
  textFooter: {
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 10,
    alignItems: 'center',
  }
})
