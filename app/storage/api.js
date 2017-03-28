import { AsyncStorage } from 'react-native'
import { fromJS } from 'immutable'

export async function toggleSaveBus (code) {
  const savedBuses = await AsyncStorage.getItem('savedBuses')
  let parsedBuses = savedBuses ? JSON.parse(savedBuses) : {}
  parsedBuses[code]
    ? parsedBuses[code] = false : parsedBuses[code] = true
  await AsyncStorage.setItem('savedBuses', JSON.stringify(parsedBuses))
}

export async function getSavedBuses () {
  const savedBuses =  await AsyncStorage.getItem('savedBuses') || '{}'
  const parsedBuses = JSON.parse(savedBuses)

  let filteredBuses = {}
  Object.keys(parsedBuses).map((code) => {
    if (parsedBuses[code]) {
      filteredBuses[code] = parsedBuses[code]
    }
  })
  return filteredBuses
}

export function filterBusesByText (text, buses) {
  const searchedText = text.trim().toUpperCase()
  let filteredBuses = fromJS({})
  buses.map((bus) => {
    const busName = bus.get('nome')
    const busCode = bus.get('code')
    if (busName.indexOf(searchedText) !== -1
        || busCode.indexOf(searchedText) !== -1) {
      filteredBuses = filteredBuses.merge({[bus.get('code')]: bus})
    }
  })
  return filteredBuses
}

export function filterBusesByArray (array, buses) {
  let filteredBuses = fromJS({})
  array.forEach(item => {
    filteredBuses = filteredBuses.merge({[item]: buses.get(item)})
  })
  return filteredBuses
}
