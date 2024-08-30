import React from 'react'
import { Link } from 'react-router-dom'
import dateFormatter from '../../utils/dateFormatter'
import Markdown from 'markdown-to-jsx'
import formatMarkdownSeparators from '../../utils/formatMarkdownSeparators'
import styles from './Article.module.scss'

function Article({ article, variant }) {
  const isFullArticle = variant === 'full'

  // Преобразуем разделители в теле статьи
  const formattedBody = formatMarkdownSeparators(article.body)

  const articleContent = (
    <div className={`${styles.article} ${isFullArticle ? styles.full : styles.list}`}>
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

      {isFullArticle && (
        <div className={styles.articleBody}>
          <Markdown>{formattedBody}</Markdown>
        </div>
      )}
    </div>
  )

  return isFullArticle ? articleContent : <Link to={`/articles/${article.slug}`}>{articleContent}</Link>
}

export default Article
