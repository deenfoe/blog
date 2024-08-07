import ShowMoreTickets from '../ShowMoreTickets/ShowMoreTickets'
import TicketSort from '../TicketSort/TicketSort'
import TicketList from '../TicketList/TicketList'
import { BiMessageError } from 'react-icons/bi'

import styles from './TicketsSection.module.scss'
import { selectLoading, selectStop, selectTickets } from '../../redux/slices/ticketsSlice'
import { useSelector } from 'react-redux'
import { selectFilters } from '../../redux/slices/filterSlice'
import filterTickets from '../../utils/filterTickets'
import { selectButtons } from '../../redux/slices/ticketSortSlice'


function TicketsSection() {
  const tickets = useSelector(selectTickets)
  const filters = useSelector(selectFilters)
  const activeButton = useSelector(selectButtons)
  const stop = useSelector(selectStop)
  const loading = useSelector(selectLoading)
  const filteredTickets = filterTickets(tickets, filters, activeButton)



  return (
    <div className={styles.ticketsSection}>
      <TicketSort />

      {!stop && <div className={styles.test}>fdsfd</div>}

      <TicketList />
      {filteredTickets.length === 0 ? (
        <div className={styles.error}>
          <BiMessageError className={styles.errorIcon} />
          <h4 className={styles.errorText}>Под заданные фильтры подходяших билетов не найдено</h4>
        </div>
      ) : (
        <ShowMoreTickets />
      )}
    </div>
  )
}
export default TicketsSection
