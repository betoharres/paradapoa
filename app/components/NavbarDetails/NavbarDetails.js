import React, { Component } from 'react'
import { POABusNavigationBar, FlashNotification } from '~/components'
import { Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { colors } from '~/styles'

class NavbarDetails extends Component {

  render () {
    return (
      <POABusNavigationBar title={`Horários de ${props.code}`}
        leftButton={
          <TouchableOpacity onPress={props.onBack}>
            <EntypoIcon name='chevron-thin-left' color={colors.blue} size={14}>
              <Text style={{color: '#4A90E2'}}>Voltar</Text>
            </EntypoIcon>
          </TouchableOpacity>
        } rightButton={
          <TouchableOpacity onPress={props.onSaveBus}>
            <Icon name={`favorite${props.isFavorite ? '' : '-border'}`}
              color={colors.red} size={20}/>
          </TouchableOpacity>
        }
      />
    )
  }
}

export default NavbarDetails
