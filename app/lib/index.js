import { fromJS, isKeyed } from 'immutable'
import busSchedules from './20190317212319.json'
export default fromJS(busSchedules, (key, value) => {
  // OrderedMap so the schedule keys keep in order
  return isKeyed(value) ? value.toOrderedMap() : value.toList()
})
