import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import dateFormatter from '../../utils/dateFormatter'
import Markdown from 'markdown-to-jsx'
import formatMarkdownSeparators from '../../utils/formatMarkdownSeparators'
import defaultImg from '../../assets/images/default-image.svg'
import styles from './Article.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../redux/slices/authFormSlice'
import {
  fetchDeleteArticle,
  fetchFavoriteArticle,
  fetchUnFavoriteArticle,
  resetSuccess,
  selectIsSuccess,
} from '../../redux/slices/articlesSlice'
import { Popover, Button, Popconfirm } from 'antd'

import { HeartOutlined, HeartFilled, QuestionCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import useArticleFormatting from '../../hooks/useArticleFormatting'
import notifications from '../../utils/notifications'

function Article({ article, variant }) {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [popoverOpen, setPopoverOpen] = useState(false)

  const isFullArticle = variant === 'full'

  // Преобразуем разделители в теле статьи
  const formattedBody = formatMarkdownSeparators(article.body)

  // Получаем текущего пользователя из состояния Redux
  const currentUser = useSelector(selectUser)

  // Проверяем, является ли текущий пользователь автором статьи
  const isAuthor = currentUser && currentUser.username === article.author.username

  // Функция для удаления статьи
  const handleDeleteArticle = async () => {
    dispatch(resetSuccess())
    await dispatch(fetchDeleteArticle(slug))
    notifications('delete')
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  const handleFavorite = (event) => {
    event.preventDefault() // Предотвращаем переход по ссылке
    event.stopPropagation() // Останавливаем всплытие события

    if (currentUser) {
      dispatch(fetchFavoriteArticle(article.slug))
    } else {
      setPopoverOpen(true)
      setTimeout(() => setPopoverOpen(false), 3000) // Скрыть Popover через 3 секунды
    }
  }

  const handleUnFavorite = (event) => {
    event.preventDefault() // Предотвращаем переход по ссылке
    event.stopPropagation() // Останавливаем всплытие события

    dispatch(fetchUnFavoriteArticle(article.slug))
  }

  const { truncatedTitle, truncatedDescription, truncatedTagList } = useArticleFormatting(article, isFullArticle)

  const articleContent = (
    <div className={`${styles.article} ${isFullArticle ? styles.full : styles.list}`}>
      <div className={styles.articleHeaderWrap}>
        <div className={styles.articleInfo}>
          <div className={styles.articleInfoHeader}>
            <h1 className={styles.articleInfoTitle}>{truncatedTitle}</h1>

            <Popover
              content={
                <span>
                  <ExclamationCircleOutlined style={{ color: 'red', marginRight: 8 }} />
                  Please sign in to favorite this article
                </span>
              }
              trigger="click"
              open={popoverOpen}
              onOpenChange={(open) => !open && setPopoverOpen(false)} // Скрывать Popover при клике вне его
            >
              <div
                className={styles.articleInfoFavorite}
                onClick={article.favorited ? handleUnFavorite : handleFavorite}
              >
                {article.favorited ? <HeartFilled /> : <HeartOutlined />}
                <span>{article.favoritesCount}</span>
              </div>
            </Popover>
          </div>

          <div className={styles.articleInfoTags}>
            {truncatedTagList.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
          <p className={styles.articleInfoDesc}>{truncatedDescription}</p>
        </div>

        <div className={styles.articleAuthorWrap}>
          <div className={styles.articleAuthor}>
            <div>
              <p className={styles.articleAuthorName}>{article.author.username}</p>
              <p className={styles.articleAuthorDate}>{dateFormatter(article.createdAt)}</p>
            </div>
            <img className={styles.img} src={article.author.image || defaultImg} alt={article.author.username} />
          </div>

          {isFullArticle && isAuthor && (
            <div className={styles.articleAuthorButtons}>
              <Popconfirm
                className={styles.deleteBtn}
                onConfirm={handleDeleteArticle}
                placement="bottomRight"
                description="Вы точно хотите удалить эту статью?"
                okText="Да"
                cancelText="Нет"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              >
                <Button
                  danger
                  style={{
                    color: '#f5222d',
                    borderColor: '#f5222d',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5222d'
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = ''
                    e.currentTarget.style.color = '#f5222d'
                  }}
                >
                  Delete
                </Button>
              </Popconfirm>

              <Link to="edit">
                <button type="button" className={styles.editBtn}>
                  Edit
                </button>
              </Link>
            </div>
          )}
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
