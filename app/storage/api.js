import { AsyncStorage } from 'react-native'

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
