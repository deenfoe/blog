import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { BiMessageError } from 'react-icons/bi'

import {
  selectTickets,
  selectStop,
  selectSearchId,
  selectDisplayedTicketsCount,
  fetchSearchId,
  fetchTickets,
} from '../../redux/slices/ticketsSlice'
import { selectFilters } from '../../redux/slices/filterSlice'
import Ticket from '../Ticket/Ticket'
import filterTickets from '../../utils/filterTickets'
import { selectButtons } from '../../redux/slices/ticketSortSlice'

import styles from './TicketList.module.scss'

function TicketList() {
  const dispatch = useDispatch()
  const tickets = useSelector(selectTickets)
  const displayedTicketesCount = useSelector(selectDisplayedTicketsCount)
  const filters = useSelector(selectFilters)
  const stop = useSelector(selectStop)
  const searchId = useSelector(selectSearchId)
  const activeButton = useSelector(selectButtons)

  // Состояние для отслеживания первого получения данных
  const [loaded, setLoaded] = useState(false)
  // Отслеживает наличие отфильтрованных билетов.
  const [noFilteredTickets, setNoFilteredTickets] = useState(false)

  // Запуск получения searchId при первом рендере компонента
  useEffect(() => {
    dispatch(fetchSearchId())
  }, [dispatch])

  // Запуск получения билетов при наличии searchId
  useEffect(() => {
    if (searchId && !stop) {
      const interval = setInterval(() => {
        dispatch(fetchTickets(searchId))
        setLoaded(true) // Устанавливаем флаг после первого получения данных
      }, 1000)
      return () => clearInterval(interval)
    }
    return undefined
  }, [dispatch, searchId, stop])

  // обновляет состояние noFilteredTickets при изменении tickets, filters или activeButton.
  useEffect(() => {
    const filteredTickets = filterTickets(tickets, filters, activeButton)
    setNoFilteredTickets(filteredTickets.length === 0)
  }, [tickets, filters, activeButton])

  const filteredTickets = filterTickets(tickets, filters, activeButton)
  // Обновление отображаемых билетов при изменении массива tickets
  const displayedTickets = filteredTickets.slice(0, displayedTicketesCount)

  if (noFilteredTickets && loaded && stop) {
    return (
      <div className={styles.error}>
        <BiMessageError className={styles.errorIcon} />
        <h3 className={styles.errorText}>По заданным фильтрам подходящих билетов не найдено</h3>
      </div>
    )
  }
  return (
    <ul className={styles.ticketList}>
      {displayedTickets.map((ticket) => (
        <Ticket key={uuidv4()} ticket={ticket} />
      ))}
    </ul>
  )
}
export default TicketList
