// Основная функция для фильтрации и сортировки билетов
function filterTickets(data, filters, activeButton) {
  // Сначала фильтруем билеты по количеству остановок
  const filteredTickets = filterByStops(data, filters)

  // Затем сортируем отфильтрованные билеты
  return sortTickets(filteredTickets, activeButton)
}

// Функция для фильтрации билетов по количеству остановок
function filterByStops(data, filters) {
  const totalStops = []
  // Собираем ключи из filters, которые имеют значение true
  for (const value in filters) {
    if (filters[value]) {
      totalStops.push(value) // Добавляем ключи (noStops, oneStop, twoStops, threeStops) в массив
    }
  }
  // Фильтруем билеты по количеству остановок
  return data.filter((ticket) => {
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

      // Проверяем, содержится ли stopsCount в массиве totalStops
      // Если содержится, возвращаем true и билет включается в результаты фильтрации
      // Если не содержится, возвращаем false и билет исключается из результатов
      return totalStops.includes(stopsCount)
    })
  })
}

// Функция для сортировки билетов в зависимости от активной кнопки
function sortTickets(tickets, activeButton) {
  // Находим активный элемент из массива activeButton, который имеет статус true
  const sortCriteria = activeButton.find((element) => element.status).label

  // Используем switch для сортировки билетов в зависимости от значения sortCriteria
  switch (sortCriteria) {
    // Если выбранный критерий сортировки - "САМЫЙ ДЕШЕВЫЙ"
    case 'САМЫЙ ДЕШЕВЫЙ':
      // Сортируем билеты по цене от меньшей к большей
      return tickets.sort((a, b) => a.price - b.price)

    // Если выбранный критерий сортировки - "САМЫЙ БЫСТРЫЙ"
    case 'САМЫЙ БЫСТРЫЙ':
      // Сортируем билеты по общему времени в пути от меньшего к большему
      return tickets.sort((a, b) => {
        // Вычисляем общее время в пути для билета 'a'
        const totalTimeA = a.segments.reduce((acc, el) => acc + el.duration, 0)
        // Вычисляем общее время в пути для билета 'b'
        const totalTimeB = b.segments.reduce((acc, el) => acc + el.duration, 0)
        // Сравниваем общее время в пути и сортируем по возрастанию
        return totalTimeA - totalTimeB
      })

    // Если выбранный критерий сортировки - "ОПТИМАЛЬНЫЙ"
    case 'ОПТИМАЛЬНЫЙ':
      // Сортируем билеты по совокупности цены и общего времени в пути от меньшего к большему
      return tickets.sort((a, b) => {
        // Вычисляем совокупность цены и общего времени в пути для билета 'a'
        const totalPriceAndTimeA = a.price + a.segments.reduce((acc, el) => acc + el.duration, 0)
        // Вычисляем совокупность цены и общего времени в пути для билета 'b'
        const totalPriceAndTimeB = b.price + b.segments.reduce((acc, el) => acc + el.duration, 0)
        // Сравниваем совокупность цены и общего времени в пути и сортируем по возрастанию
        return totalPriceAndTimeA - totalPriceAndTimeB
      })

    // Если критерий сортировки не соответствует ни одному из вышеуказанных случаев
    default:
      // Возвращаем исходный массив билетов без сортировки
      return tickets
  }
}

export default filterTickets
