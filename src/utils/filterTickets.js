function filterTickets(data, filters) {
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
  return filteredTickets
}

export default filterTickets
