import React, { useEffect } from 'react'
import { fetchArticles, selectCurrentPage, selectPageSize, setCurrentPage } from '../../redux/slices/articlesSlice'
import styles from './App.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '../Layouts/MainLayout'
import ArticlePage from '../../pages/ArticlePage/ArticlePage'
import ArticlesPage from '../../pages/ArticlesPage/ArticlesPage'
import SignUpPage from '../../pages/SignUpPage/SignUpPage'
import LoginForm from '../Form/SignInForm'
import SingInPage from '../../pages/SignInPage/SignInPage'
import ProfilePage from '../../pages/ProfilePage/ProfilePage'
import { selectIsAuthenticated } from '../../redux/slices/authFormSlice'
import NewArticlePage from '../../pages/NewArticlePage/NewArticlePage'
import EditArticlePage from '../../pages/EditArticlePage/EditArticlePage'
import PrivateRoute from '../PrivateRoute/PrivateRoute'

function App() {
  const dispatch = useDispatch()
  const currentPage = useSelector(selectCurrentPage)
  const pageSize = useSelector(selectPageSize)

  useEffect(() => {
    dispatch(fetchArticles({ page: currentPage, pageSize }))
  }, [dispatch, currentPage, pageSize])

  // console.log(articles)

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page))
  }
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ArticlesPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="sign-in" element={<SingInPage />} />
          <Route path="profile" element={<PrivateRoute element={<ProfilePage />} />} />
          <Route path="new-article" element={<PrivateRoute element={<NewArticlePage />} />} />
          <Route path="articles/:slug/edit" element={<EditArticlePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
