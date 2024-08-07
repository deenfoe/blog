function filterTickets(data, filters, activeButton) {
  const totalStops = [] // ["oneStop", "threeStops"]

  //Берем из объекта ключи которые true
  for (const value in filters) {
    if (filters[value]) {
      totalStops.push(value) // noStops, oneStop, twoStops, threeStops
    }
  }

  const filteredTickets = data.filter((ticket) => {
    return ticket.segments.every((item) => {
      let stopsCount
      switch (item.stops.length) {
        case 0:
          stopsCount = 'noStops'
          break
        case 1:
          stopsCount = 'oneStop'
          break
        case 2:
          stopsCount = 'twoStops'
          break
        case 3:
          stopsCount = 'threeStops'
          break
        default:
          stopsCount = null
      }
      return totalStops.includes(stopsCount)
    })
  })
  const test = activeButton.find((element) => element.status).label
  switch (test) {
    case 'САМЫЙ ДЕШЕВЫЙ':
      filteredTickets.sort((a, b) => a.price - b.price)
      break
    case 'САМЫЙ БЫСТРЫЙ':
      filteredTickets.sort((a, b) => {
        const totalTimeA = a.segments.reduce((acc, el) => acc + el.duration, 0)
        const totalTimeB = b.segments.reduce((acc, el) => acc + el.duration, 0)
        return totalTimeA - totalTimeB
      })
      break
    case 'ОПТИМАЛЬНЫЙ':
      filteredTickets.sort((a, b) => {
        const totalPriceAndTimeA = a.price + a.segments.reduce((acc, el) => acc + el.duration, 0)
        const totalPriceAndTimeB = b.price + b.segments.reduce((acc, el) => acc + el.duration, 0)
        return totalPriceAndTimeA - totalPriceAndTimeB
      })
      break
    default:
      return filteredTickets
  }
  return filteredTickets
}

export default filterTickets
