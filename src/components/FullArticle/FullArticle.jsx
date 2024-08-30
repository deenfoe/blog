import React from 'react'
import styles from './FullArticle.module.scss'
import img from '../../assets/images/smiley-cyrus.jpg'
import dateFormatter from '../../utils/dateFormatter'

function FullArticle({ article }) {
  return (
    <div className={styles.article}>
      <div className={styles.articleHeaderWrap}>
        <div className={styles.articleInfo}>
          <h1 className={styles.articleInfoTitle}>{article.title}</h1>
          <div className={styles.articleInfoTags}>
            {article.tagList.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
          <p className={styles.articleInfoDesc}>{article.description}</p>
        </div>

        <div className={styles.articleAuthor}>
          <div>
            <p className={styles.articleAuthorName}>{article.author.username}</p>
            <p className={styles.articleAuthorDate}>{dateFormatter(article.createdAt)}</p>
          </div>
          <img className={styles.img} src={article.author.image} alt={article.author.username} />
        </div>
      </div>

      <div className={styles.articleBody}>
        <p>{article.body}</p>
      </div>
    </div>
  )
}

export default FullArticle
