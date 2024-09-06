// src/hooks/useArticleFormatting.js
import { truncateText, truncateTags } from '../utils/textFormatter'

import useWindowSize from './useWindowSize'

function useArticleFormatting(article, isFullArticle) {
  const { width } = useWindowSize()

  const titleMaxLength =
    width < 450 ? 10 : width < 500 ? 16 : width < 550 ? 20 : width < 600 ? 26 : width < 650 ? 35 : width < 700 ? 40 : 50
  const descriptionMaxLength =
    width < 500
      ? 23
      : width < 550
        ? 70
        : width < 600
          ? 78
          : width < 650
            ? 85
            : width < 700
              ? 94
              : width < 750
                ? 102
                : width < 800
                  ? 109
                  : width < 850
                    ? 115
                    : width < 900
                      ? 120
                      : 140
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
