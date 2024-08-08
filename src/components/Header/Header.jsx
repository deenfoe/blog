import img from '../../assets/images/Logo.svg'

import styles from './Header.module.scss'

function Header() {
  return (
    <div className={styles.header}>
      <img src={img} alt="" className={styles.img} />
    </div>
  )
}

export default Header
