import img from '../../assets/images/S7 Logo.svg'

import styles from './Ticket.module.scss'

function Ticket() {
  return (
    <li className={styles.ticket}>
      <div className={styles.ticketPriceCompany}>
        <span className={styles.ticketPrice}>13 400 P</span>
        <img src={img} alt="logo" />
      </div>
      <div className={styles.ticketTransfers}>
        <div className={styles.ticketTransfer}>
          <div className={styles.ticketTransferInfo}>
            <span className={styles.ticketTransferTitle}>MOW - HKT</span>
            <span className={styles.ticketTransferDesc}>10:45 - 08:00</span>
          </div>
          <div className={styles.ticketTransferInfo}>
            <span className={styles.ticketTransferTitle}>В ПУТИ</span>
            <span className={styles.ticketTransferDesc}>21ч 15м</span>
          </div>
          <div className={styles.ticketTransferInfo}>
            <span className={styles.ticketTransferTitle}>2 ПЕРЕСАДКИ</span>
            <span className={styles.ticketTransferDesc}>HKG, JNB</span>
          </div>
        </div>
      </div>
      <div className={styles.ticketTransfers}>
        <div className={styles.ticketTransfer}>
          <div className={styles.ticketTransferInfo}>
            <span className={styles.ticketTransferTitle}>MOW - HKT</span>
            <span className={styles.ticketTransferDesc}>10:45 - 08:00</span>
          </div>
          <div className={styles.ticketTransferInfo}>
            <span className={styles.ticketTransferTitle}>В ПУТИ</span>
            <span className={styles.ticketTransferDesc}>21ч 15м</span>
          </div>
          <div className={styles.ticketTransferInfo}>
            <span className={styles.ticketTransferTitle}>2 ПЕРЕСАДКИ</span>
            <span className={styles.ticketTransferDesc}>HKG, JNB</span>
          </div>
        </div>
      </div>
    </li>
  )
}
export default Ticket
