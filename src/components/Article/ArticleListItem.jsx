import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ArticleListItem.module.scss'
import dateFormatter from '../../utils/dateFormatter'

import img from '../../assets/images/smiley-cyrus.jpg'

function Article({ article }) {
  return (
    <Link to={`/articles/${article.slug}`}>
      <div className={styles.article}>
        <div className={styles.articleInfo}>
          <h3 className={styles.articleInfoTitle}>{article.title}</h3>
          <p className={styles.articleInfoTags}>
            {article.tagList.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </p>
          <p className={styles.articleInfoDesc}>{article.description}</p>
        </div>

        <div className={styles.articleAuthor}>
          <div>
            <p className={styles.articleAuthorName}>{article.author.username}</p>
            <p className={styles.articleAuthorDate}>{dateFormatter(article.createdAt)}</p>
          </div>
          <img className={styles.img} src={img} alt={article.author.username} />
        </div>
      </div>
    </Link>
  )
}

export default Article
