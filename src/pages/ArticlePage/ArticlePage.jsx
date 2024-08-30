import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchArticles, selectArticleBySlug } from '../../redux/slices/articlesSlice'

import styles from './ArticlePage.module.scss'
import Article from '../../components/Article/Article'

function ArticlePage() {
  const { slug } = useParams() // Получаем slug из параметров URL
  const dispatch = useDispatch()

  // Загрузка статьи
  useEffect(() => {
    dispatch(fetchArticles({ slug }))
  }, [dispatch, slug])

  // Получение статьи из стейта по slug
  const article = useSelector(selectArticleBySlug(slug))

  return <div className={styles.articlePage}>{article && <Article article={article} variant="full" />}</div>
  // return <div className={styles.articlePage}>{article && <FullArticle article={article} />}</div>
}

export default ArticlePage
