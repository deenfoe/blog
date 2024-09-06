import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { fetchArticles, selectArticleBySlug } from '../../redux/slices/articlesSlice'
import ArticleForm from '../../components/Form/ArticleForm/ArticleForm'

import styles from './EditArticlePage.module.scss'

function EditArticlePage() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const article = useSelector(selectArticleBySlug(slug))

  useEffect(() => {
    if (!article) {
      dispatch(fetchArticles({ slug })) // Загружаем статью, если она еще не загружена
    }
  }, [slug, dispatch, article])
  return (
    <div className={styles.editArticlePage}>
      {article ? <ArticleForm title="Edit article" initialData={article} isEdit /> : <p>Loading</p>}
    </div>
  )
}

export default EditArticlePage
