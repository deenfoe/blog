import styles from './Header.module.scss'
import img from '../../assets/images/Logo.svg'

function Header() {
  return (
    <div className={styles.header}>
      <img src={img} alt="" className={styles.img} />
    </div>
  )
}

export default Header
