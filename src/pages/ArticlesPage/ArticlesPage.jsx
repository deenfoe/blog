import React, { useEffect } from 'react'
import {
  fetchArticles,
  selectArticles,
  selectArticlesCount,
  selectCurrentPage,
  selectPageSize,
  setCurrentPage,
} from '../../redux/slices/articlesSlice'
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

  useEffect(() => {
    dispatch(fetchArticles({ page: currentPage, pageSize }))
  }, [dispatch, currentPage, pageSize])

  // console.log(articles)

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page))
  }
  return (
    <div className={styles.articlesPage}>
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
    </div>
  )
}

export default ArticlesPage
