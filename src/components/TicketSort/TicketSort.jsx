import { useDispatch, useSelector } from 'react-redux'

import { selectButtons, setActiveButton } from '../../redux/slices/ticketSortSlice'

import styles from './TicketSort.module.scss'

function TicketSort() {
  const dispatch = useDispatch()
  const sortedButtons = useSelector(selectButtons)

  function onActiveButton(button) {
    dispatch(setActiveButton(button))
  }

  return (
    <div className={styles.ticketSort}>
      {sortedButtons.map((button) => {
        return (
          <button
            key={button.id}
            className={`${styles.ticketSortBtn} ${button.status ? styles.active : ''}`}
            onClick={() => onActiveButton(button.label)}
          >
            {button.label}
          </button>
        )
      })}
    </div>
  )
}

export default TicketSort
