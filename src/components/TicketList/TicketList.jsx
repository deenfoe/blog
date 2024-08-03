import { useSelector } from 'react-redux'
import { selectTickets, selectLoading, selectError } from '../../redux/slices/ticketsSlice'
import Ticket from '../Ticket/Ticket'

import styles from './TicketList.module.scss'

function TicketList() {
  const tickets = useSelector(selectTickets)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <ul className={styles.ticketList}>
      {tickets.map((ticket, index) => (
        <Ticket key={index} ticket={ticket} />
      ))}
    </ul>
  )
}
export default TicketList
