// src/hooks/useArticleFormatting.js
import useWindowSize from './useWindowSize'

import { truncateText, truncateTags } from '../utils/textFormatter'

function useArticleFormatting(article, isFullArticle) {
  const { width } = useWindowSize()

  const titleMaxLength =
    width < 500 ? 10 : width < 600 ? 16 : width < 700 ? 21 : width < 800 ? 26 : width < 900 ? 30 : 50
  const descriptionMaxLength =
    width < 500 ? 23 : width < 600 ? 70 : width < 700 ? 85 : width < 800 ? 120 : width < 928 ? 150 : 180
  const tagMaxLength = width < 500 ? 6 : width < 600 ? 8 : width < 900 ? 8 : 10
  const maxTagsCount = width < 500 ? 2 : width < 600 ? 2 : width < 700 ? 2 : width < 800 ? 4 : width < 928 ? 4 : 5

  if (isFullArticle) {
    // Если это полная статья, возвращаем текст и теги без изменений
    return {
      truncatedTitle: article.title,
      truncatedDescription: article.description,
      truncatedTagList: truncateTags(article.tagList || [], 20, Infinity) || [],
    }
  }

  const truncatedTitle = truncateText(article.title, titleMaxLength)
  const truncatedDescription = truncateText(article.description, descriptionMaxLength)
  const truncatedTagList = truncateTags(article.tagList || [], tagMaxLength, maxTagsCount)

  return { truncatedTitle, truncatedDescription, truncatedTagList }
}

export default useArticleFormatting
