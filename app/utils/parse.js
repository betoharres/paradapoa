export function parseTitle (direction) {
  return direction.replace(/_/, ' ').replace(/(^|\s)(\w)/g, letter => letter.toUpperCase())
}

export function parseTime (time) {
  time = time.toString()
  return time === 0 || time < 10 ? '0' + time : time
}

export function parseDirection (direction) {
  return parseTitle(direction).replace(/\s/, ' / ')
}
