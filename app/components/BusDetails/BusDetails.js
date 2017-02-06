import React, { PropTypes } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { POABusNavigationBar } from '~/components'

BusDetails.propTypes = {
  onBack: PropTypes.func.isRequired,
  onSaveBus: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  schedules: PropTypes.object.isRequired,
  saveBus: PropTypes.func.isRequired,
}

export default function BusDetails (props) {

  return (
    <View>
      <POABusNavigationBar title={`Horários do ${props.code}`} onBack={props.onBack} />
      <Text style={{fontSize: 14}}>{props.name}</Text>
      <TouchableOpacity onPress={props.onSaveBus}>
        <Text>SAVE BUS</Text>
      </TouchableOpacity>
    </View>
  )

}
