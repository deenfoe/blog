import ArticleForm from '../../components/Form/ArticleForm'
import styles from './NewArticlePage.module.scss'

function NewArticlePage() {
  return (
    <div className={styles.newArticlePage}>
      <ArticleForm />
    </div>
  )
}

export default NewArticlePage
