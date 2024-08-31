import styles from './ArticleForm.module.scss'

function ArticleForm() {
  return (
    <div className={styles.articleFormContainer}>
      <h2 className={styles.articleFormTitle}>Create new article</h2>
      <form className={styles.articleForm}>
        <label className={styles.articleFormLabel}>
          Title
          <input className={styles.articleFormInput} placeholder="Title" />
        </label>

        <label className={styles.articleFormLabel}>
          Short description
          <input className={styles.articleFormInput} placeholder="Short description" />
        </label>

        <label className={styles.articleFormLabel}>
          Text
          <textarea className={styles.articleFormTextarea} placeholder="Write your article here..."></textarea>
        </label>

        <label className={styles.articleFormLabel}>
          Tags
          <div className={styles.articleFormTags}>
            <input className={styles.articleFormInput} placeholder="tag" />
            <button className={`${styles.articleFormButton} ${styles.deleteBtn}`}>Delete</button>
          </div>
          <div className={styles.articleFormTags}>
            <input className={styles.articleFormInput} placeholder="tag" />
            <button className={`${styles.articleFormButton} ${styles.deleteBtn}`}>Delete</button>
            <button className={`${styles.articleFormButton} ${styles.addBtn}`}>Add tag</button>
          </div>
        </label>

        <button className={`${styles.articleFormButton} ${styles.sendBtn}`}>Send</button>
      </form>
    </div>
  )
}

export default ArticleForm
