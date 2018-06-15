export function getDayWeek () {
  const date = new Date()
  const day = date.getDay()

  if (day >=1 && day <= 5)
    return 'dias_uteis'
  else if (day === 6)
    return 'sabado'
  else
    return 'domingo'
}

export function getCurrentTime () {
  const date = new Date()
  return `${date.getHours()}:${date.getMinutes()}`
}
