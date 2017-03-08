import React, { PropTypes } from 'react'
import { Text, View, TouchableOpacity,
         StyleSheet, Platform, Dimensions, ScrollView } from 'react-native'
import { POABusNavigationBar } from '~/components'
import { colors, fontSizes } from '~/styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
const { width } = Dimensions.get('window')
const SCHEDULE_ITEM_WIDTH = (width * 0.25)

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
  // props.schedules.getIn(['ida', 'dias_uteis']).get(0).get(0).get(1)

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
          ? 'Roboto' : 'Helvetica Neue'}]}>{props.name}</Text>
      </View>
      <ScrollView>
        <View style={styles.schedulesContainer}>
          <View style={styles.scheduleItem}>
            <Text>{'Hi'}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )

}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginTop: 15,
    paddingBottom: 15,
    borderBottomColor: colors.border,
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: fontSizes.primary,
  },
  schedulesContainer: {
    margin: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  scheduleItem: {
    width: (SCHEDULE_ITEM_WIDTH - 10),
    padding: 10,
    maxHeight: 40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 7,
    borderColor: colors.border,
  }
})
