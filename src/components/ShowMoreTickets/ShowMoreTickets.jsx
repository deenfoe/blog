import { useDispatch, useSelector } from 'react-redux'

import { selectTickets, showMoreTickets } from '../../redux/slices/ticketsSlice'
import filterTickets from '../../utils/filterTickets'
import { selectFilters } from '../../redux/slices/filterSlice'
import { selectButtons } from '../../redux/slices/ticketSortSlice'

import styles from './ShowMoreTickets.module.scss'

function ShowMoreTickets() {
  const dispatch = useDispatch()
  const tickets = useSelector(selectTickets)
  const filters = useSelector(selectFilters)
  const activeButton = useSelector(selectButtons)
  const filteredTickets = filterTickets(tickets, filters, activeButton)

  const handleShowMoreTickets = () => {
    dispatch(showMoreTickets())
  }
  // filteredTickets
  // if (loading && filteredTickets.length === 0) {
  //   return (
  //     <div className={styles.error}>
  //       <BiMessageError className={styles.errorIcon} />
  //       <h4 className={styles.errorText}>Под заданные фильтры подходяших билетов не найдено</h4>
  //     </div>
  //   )
  // }
  return (
    filteredTickets.length > 0 && (
      <button className={styles.showMoreTicketsBtn} onClick={handleShowMoreTickets}>
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
      </button>
    )
  )

  // <div>
  //   <button className={styles.showMoreTicketsBtn} onClick={handleShowMoreTickets}>
  //     ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
  //   </button>
  // </div>
}
export default ShowMoreTickets
