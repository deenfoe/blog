import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import {
  selectTickets,
  selectLoading,
  selectError,
  selectStop,
  selectSearchId,
  selectDisplayedTicketsCount,
  fetchSearchId,
  fetchTickets,
  showMoreTickets,
} from '../../redux/slices/ticketsSlice'
import Ticket from '../Ticket/Ticket'

import styles from './TicketList.module.scss'

function TicketList() {
  const dispatch = useDispatch()
  const tickets = useSelector(selectTickets)
  const displayedTicketesCount = useSelector(selectDisplayedTicketsCount)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const stop = useSelector(selectStop)
  const searchId = useSelector(selectSearchId)

  // Запуск получения searchId при первом рендере компонента
  useEffect(() => {
    dispatch(fetchSearchId())
  }, [dispatch])

  // Запуск получения билетов при наличии searchId
  useEffect(() => {
    if (searchId && !stop) {
      const interval = setInterval(() => {
        dispatch(fetchTickets(searchId))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [dispatch, searchId, stop])

  // Обновление отображаемых билетов при изменении массива tickets
  const displayedTickets = tickets.slice(0, displayedTicketesCount)

  return (
    <ul className={styles.ticketList}>
      {displayedTickets.map((ticket, index) => (
        <Ticket key={uuidv4()} ticket={ticket} />
      ))}
    </ul>
  )
}
export default TicketList
