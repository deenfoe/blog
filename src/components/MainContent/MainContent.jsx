import Filter from '../Filter/Filter'
import TicketsSection from '../TicketsSection/TicketsSection'

import styles from './MainContent.module.scss'

function MainContent() {
  return (
    <div className={styles.main}>
      <Filter />
      <TicketsSection />
    </div>
  )
}
export default MainContent
