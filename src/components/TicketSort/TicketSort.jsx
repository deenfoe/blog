/* eslint-disable */
import React, { useState } from 'react'

import styles from './TicketSort.module.scss'

function TicketSort() {
  const [activeButton, setActiveButton] = useState('САМЫЙ ДЕШЕВЫЙ')

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName)
  }

  return (
    <div className={styles.ticketSort}>
      <button
        className={`${styles.ticketSortBtn} ${activeButton === 'САМЫЙ ДЕШЕВЫЙ' ? styles.active : ''}`}
        onClick={() => handleButtonClick('САМЫЙ ДЕШЕВЫЙ')}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        className={`${styles.ticketSortBtn} ${activeButton === 'САМЫЙ БЫСТРЫЙ' ? styles.active : ''}`}
        onClick={() => handleButtonClick('САМЫЙ БЫСТРЫЙ')}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
      <button
        className={`${styles.ticketSortBtn} ${activeButton === 'ОПТИМАЛЬНЫЙ' ? styles.active : ''}`}
        onClick={() => handleButtonClick('ОПТИМАЛЬНЫЙ')}
      >
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  )
}

export default TicketSort
