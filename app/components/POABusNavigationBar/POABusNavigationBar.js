import React, {PropTypes} from 'react'
import { Platform } from 'react-native'
import NavigationBar from 'react-native-navbar'
import { colors } from '~/styles'

POABusNavigationBar.propTypes = {
  title: PropTypes.string.isRequired,
  rightButton: PropTypes.element,
  leftButton: PropTypes.element,
}

export default function POABusNavigationBar (props) {
  let optionalAttrs = {}
  props.leftButton &&
    (optionalAttrs.leftButton = React.cloneElement(
    props.leftButton,
    {style: {marginLeft: 10, marginRight: 10, justifyContent: 'center'}}
    ))
  props.rightButton &&
    (optionalAttrs.rightButton = React.cloneElement(
    props.rightButton,
    {style: {marginLeft: 10, marginRight: 10, justifyContent: 'center'}}
    ))

  return (
    <NavigationBar
      {...optionalAttrs}
      style={Platform.OS === 'android' ? {marginTop: 8, marginBottom: 8} : null}
      tintColor='#F7F9F9'
      title={{title: props.title}} />
  )

}
