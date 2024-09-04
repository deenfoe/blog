import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import img from '../../assets/images/default-image.svg'
import { logout, selectState, selectUser } from '../../redux/slices/authFormSlice'
import {
  fetchArticles,
  resetArticlesState,
  resetFavorited,
  selectArticles,
  selectCurrentPage,
  selectPageSize,
  updateFavoriteStatus,
} from '../../redux/slices/articlesSlice'
import { showSuccessToast } from '../../utils/toastify'

function Header() {
  const user = useSelector(selectUser)
  const currentPage = useSelector(selectCurrentPage)
  const pageSize = useSelector(selectPageSize)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('user')

    showSuccessToast('🦄 Вы успешно вышли из системы!')

    dispatch(fetchArticles({ page: currentPage, pageSize }))
    // dispatch(resetFavorited());
  }

  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>RealWorld Blog</div>
      </Link>
      <div className={styles.links}>
        {user ? (
          <>
            <Link to="/new-article">
              <div className={`${styles.createArticle} ${styles.button}`}>Create article</div>
            </Link>
            <Link to="/profile">
              <div className={styles.profile}>
                <div className={styles.profileUserName}>{user.username}</div>
                <img className={styles.img} src={user.image || img} alt={user.username} />
              </div>
            </Link>
            <button className={`${styles.logout} ${styles.button}`} onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/sign-in">
              <div className={`${styles.signIn} ${styles.button}`}>Sign In</div>
            </Link>
            <Link to="/sign-up">
              <div className={`${styles.signUp} ${styles.button}`}>Sign Up</div>
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
