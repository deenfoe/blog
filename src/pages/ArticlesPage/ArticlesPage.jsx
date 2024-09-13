import React, { useEffect, useState } from 'react'
import { Alert, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchArticles,
  selectArticles,
  selectArticlesCount,
  selectCurrentPage,
  selectErrors,
  selectIsLoading,
  selectPageSize,
  setCurrentPage,
} from '../../redux/slices/articlesSlice'
import Article from '../../components/Article/Article'
import PaginationComponent from '../../components/PaginationComponent/PaginationComponent'

import styles from './ArticlesPage.module.scss'

function ArticlesPage() {
  const dispatch = useDispatch()
  const articles = useSelector(selectArticles)
  const articlesCount = useSelector(selectArticlesCount)
  const currentPage = useSelector(selectCurrentPage)
  const pageSize = useSelector(selectPageSize)
  const isLoading = useSelector(selectIsLoading)
  const errors = useSelector(selectErrors)

  // Состояние для управления видимостью спиннера
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    dispatch(fetchArticles({ page: currentPage, pageSize }))
  }, [dispatch, currentPage, pageSize])

  useEffect(() => {
    let timer
    if (isLoading) {
      // Если загрузка началась, устанавливаем таймер на 2 секунды
      timer = setTimeout(() => {
        setShowSpinner(true)
      }, 2000)
    } else {
      // Как только загрузка завершена, убираем спиннер
      setShowSpinner(false)
      clearTimeout(timer)
    }
    // Чистим таймер при размонтировании или завершении загрузки
    return () => clearTimeout(timer)
  }, [isLoading])

  // Обработчик фокуса окна
  useEffect(() => {
    const handleFocus = () => {
      dispatch(fetchArticles({ page: currentPage, pageSize }))
    }

    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [dispatch, currentPage, pageSize])

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page))
  }

  let content

  if (showSpinner) {
    content = (
      <div className={styles.loader}>
        <Spin size="large" />
      </div>
    )
  } else if (errors) {
    content = <Alert message="Ошибка при загрузке данных" description={errors} type="error" showIcon />
  } else if (articles.length === 0) {
    content = (
      <Alert
        message="Нет доступного контента"
        description="На данный момент статьи отсутствуют. Пожалуйста, попробуйте позже."
        type="info"
        showIcon
      />
    )
  } else {
    content = (
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
    )
  }

  return <div className={styles.articlesPage}>{content}</div>
}

export default ArticlesPage

// return (
//   <div className={styles.articlesPage}>
//     {showSpinner ? (
//       <div className={styles.loader}>
//         <Spin size="large" />
//       </div>
//     ) : errors ? (
//       <Alert message="Ошибка при загрузке данных" description={errors} type="error" showIcon />
//     ) : (
//       <>
//         <ul className={styles.articles}>
//           {articles.map((article) => (
//             <li key={article.slug}>
//               <Article article={article} variant="list" />
//             </li>
//           ))}
//         </ul>
//         <PaginationComponent
//           currentPage={currentPage}
//           pageSize={pageSize}
//           total={articlesCount}
//           onChange={handlePageChange}
//         />
//       </>
//     )}
//   </div>
// )
// }
