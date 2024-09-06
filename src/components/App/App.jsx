import { Route, Routes } from 'react-router-dom'
import MainLayout from '../Layouts/MainLayout'
import ArticlePage from '../../pages/ArticlePage/ArticlePage'
import ArticlesPage from '../../pages/ArticlesPage/ArticlesPage'
import SignUpPage from '../../pages/SignUpPage/SignUpPage'
import SignInPage from '../../pages/SignInPage/SignInPage'
import ProfilePage from '../../pages/ProfilePage/ProfilePage'
import NewArticlePage from '../../pages/NewArticlePage/NewArticlePage'
import EditArticlePage from '../../pages/EditArticlePage/EditArticlePage'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage'
import styles from './App.module.scss'



function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ArticlesPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="profile" element={<PrivateRoute element={<ProfilePage />} />} />
          <Route path="new-article" element={<PrivateRoute element={<NewArticlePage />} />} />
          <Route path="articles/:slug/edit" element={<EditArticlePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
