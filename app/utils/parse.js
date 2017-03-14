export function parseTitle (direction) {
  return direction.replace(/_/, ' ').replace(/(^|\s)(\w)/g, letter => letter.toUpperCase())
}
