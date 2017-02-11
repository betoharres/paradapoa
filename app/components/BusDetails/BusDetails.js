import React, { PropTypes } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { POABusNavigationBar } from '~/components'
import { colors, fontSizes } from '~/styles'
import Icon from 'react-native-vector-icons/MaterialIcons'

BusDetails.propTypes = {
  onBack: PropTypes.func.isRequired,
  onSaveBus: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  schedules: PropTypes.object.isRequired,
  saveBus: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
}

export default function BusDetails (props) {

  console.log(props.schedules.toJS())

  return (
    <View>
      <POABusNavigationBar title={`Horários do ${props.code}`}
        leftButton={
          <TouchableOpacity onPress={props.onBack}>
            <Text style={{color: '#4A90E2'}}>Fechar</Text>
          </TouchableOpacity>
        } rightButton={
          <TouchableOpacity style={styles.saveBusBtn} onPress={props.onSaveBus}>
            <Icon name={`favorite${props.isFavorite ? '' : '-border'}`}
              color={colors.red} size={20}/>
          </TouchableOpacity>
        }
      />
      <View style={styles.titleContainer}>
        <Text style={[styles.title, {fontFamily: Platform.OS === 'android'
          ? 'Roboto'
          : 'Helvetica Neue'}]}>{props.name}</Text>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  title: {
    fontSize: fontSizes.primary,
  }
})
