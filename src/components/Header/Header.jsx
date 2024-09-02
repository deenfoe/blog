import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import img from '../../assets/images/default-image.svg'
import { logout, selectState, selectUser } from '../../redux/slices/authFormSlice'

function Header() {
  const user = useSelector(selectUser)

  // console.log(user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('user')
  }

  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>RealWorld Blog</div>
      </Link>
      <div className={styles.links}>
        {user ? ( // <-- If user is logged in, show profile and logout options
          <>
            <Link to="/new-article">
              <div className={styles.createArticle}>Create article</div>
            </Link>
            <Link to="/profile">
              <div className={styles.profile}>
                <div className={styles.profileUserName}>{user.username}</div>
                <img className={styles.img} src={user.image || img} alt={user.username} />
              </div>
            </Link>

            <button className={styles.logout} onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          // <-- If user is not logged in, show sign-in and sign-up buttons
          <>
            <Link to="/sign-in">
              <div className={styles.signIn}>Sign In</div>
            </Link>
            <Link to="/sign-up">
              <div className={styles.signUp}>Sign Up</div>
            </Link>
          </>
        )}
      </div>
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
    </header>
  )
}

export default Header
