// 1 -> 01
export function pad(num, len) { return (`00000000${num}`).substr(-len) }

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

export function getNextSchedule (busSchedules, direction) {
  const scheduleDirection = busSchedules.get(direction)
  if (scheduleDirection) {
    const schedulesToday = scheduleDirection.get(getDayWeek())
    if (schedulesToday) {
      const [...scheduleKeys] = schedulesToday.keys()
      const now = new Date()
      const hour = now.getHours()
      const minutes = pad(now.getMinutes(), 2)
      const currentTime = parseInt(`${hour}${minutes}`)
      const nextSchedule = scheduleKeys.find((schedule) => parseInt(schedule) >= currentTime)
      return nextSchedule ? schedulesToday.get(nextSchedule) : schedulesToday.first()
    }
  }
  return null
}
