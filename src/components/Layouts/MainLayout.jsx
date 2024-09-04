import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import styles from './MainLayout.module.scss'

function MainLayout() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </div>
  )
}

export default MainLayout
