import React, { useEffect } from 'react'
import {
  fetchArticles,
  selectArticles,
  selectArticlesCount,
  selectCurrentPage,
  selectIsLoading,
  selectPageSize,
  setCurrentPage,
} from '../../redux/slices/articlesSlice'
import { Spin } from 'antd'
import Article from '../../components/Article/Article'
import { useDispatch, useSelector } from 'react-redux'
import PaginationComponent from '../../components/PaginationComponent/PaginationComponent'

import styles from './ArticlesPage.module.scss'

function ArticlesPage() {
  const dispatch = useDispatch()
  const articles = useSelector(selectArticles)
  const articlesCount = useSelector(selectArticlesCount)
  const currentPage = useSelector(selectCurrentPage)
  const pageSize = useSelector(selectPageSize)
  const isLoading = useSelector(selectIsLoading)

  useEffect(() => {
    dispatch(fetchArticles({ page: currentPage, pageSize }))
  }, [dispatch, currentPage, pageSize])

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page))
  }
  return (
    <div className={styles.articlesPage}>
      {isLoading ? (
        <div className={styles.loader}>
          <Spin size="large" /> {/* Отображаем анимацию загрузки */}
        </div>
      ) : (
        <>
          <ul className={styles.articles}>
            {articles.map((article) => (
              <li key={article.slug}>
                <Article article={article} variant="list" />
              </li>
            ))}
          </ul>
          <PaginationComponent
            currentPage={currentPage}
            pageSize={pageSize}
            total={articlesCount}
            onChange={handlePageChange}
          />
        </>
      )}
    </div>
  )
}

export default ArticlesPage
