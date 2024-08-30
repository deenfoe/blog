import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import img from '../../assets/images/smiley-cyrus.jpg'

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>RealWorld Blog</div>
      </Link>

      {/* {isLogged ? (
        <div className={styles.links}>
          <Link to="/profile">
            <div className={styles.profile}>
              <div>{loggedUser.username}</div>
              <img className={styles.img} src={loggedUser?.image || img} alt={loggedUser.username} />
            </div>
          </Link>

          <div className={styles.logout}>
            <Link to="/logout">
              <div className={styles.logout}>Logout</div>
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.links}>
          <Link to="/sign-in">
            <div className={styles.signIn}>Sign In</div>
          </Link>

          <Link to="sign-up">
            <div className={styles.signUp}>Sign Up</div>
          </Link>
        </div>
      )} */}
      <div className={styles.links}>
        <Link to="/sign-in">
          <div className={styles.signIn}>Sign In</div>
        </Link>

        <Link to="sign-up">
          <div className={styles.signUp}>Sign Up</div>
        </Link>
      </div>
    </header>
  )
}

export default Header
