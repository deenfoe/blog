import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import styles from './MainLayout.module.scss'

function MainLayout() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
