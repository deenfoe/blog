import { useDispatch } from 'react-redux'
import { showMoreTickets } from '../../redux/slices/ticketsSlice'

import styles from './ShowMoreTickets.module.scss'
function ShowMoreTickets() {
  const dispatch = useDispatch()

  const handleShowMoreTickets = () => {
    dispatch(showMoreTickets())
  }

  return (
    <div>
      <button className={styles.showMoreTicketsBtn} onClick={handleShowMoreTickets}>
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
      </button>
    </div>
  )
}
export default ShowMoreTickets
