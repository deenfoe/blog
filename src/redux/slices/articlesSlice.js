import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  articles: [],
  articleBySlug: {},
  articlesCount: 0,
  currentPage: 1,
  pageSize: 5,
}

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async ({ slug, page, pageSize }) => {
  if (slug) {
    const response = await axios.get(`https://blog.kata.academy/api/articles/${slug}`)
    return { singleArticle: response.data.article }
  } else {
    const response = await axios.get(
      `https://blog.kata.academy/api/articles?limit=${pageSize}&offset=${(page - 1) * pageSize}`
    )
    // const truncateText = (text, maxLength) => {
    //   if (text.length > maxLength) {
    //     let truncated = text.substring(0, maxLength)
    //     if (truncated.endsWith(' ')) {
    //       truncated = truncated.trimEnd()
    //     }
    //     return truncated + '...'
    //   }
    //   return text
    // }

    const truncateText = (text, maxLength) => {
      if (typeof text !== 'string') {
        return ''
      }

      if (text.length > maxLength) {
        let truncated = text.substring(0, maxLength)
        if (truncated.endsWith(' ')) {
          truncated = truncated.trimEnd()
        }
        return truncated + '...'
      }
      return text
    }

    const truncateTags = (tags) => {
      if (tags.length > 10) {
        return tags.slice(0, 5)
      }
      return tags
    }

    // const truncatedArticles = response.data.articles.map((article) => ({
    //   ...article,
    //   title: truncateText(article.title, 50),
    //   description: truncateText(article.description, 150),
    //   tagList: truncateTags(article.tagList),
    // }))

    const truncatedArticles = (response.data.articles || []).map((article) => ({
      ...article,
      title: truncateText(article.title, 50),
      description: truncateText(article.description, 150),
      tagList: truncateTags(article.tagList || []),
    }))

    return {
      articles: truncatedArticles,
      articlesCount: response.data.articlesCount,
    }
  }
})

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      if (action.payload.singleArticle) {
        state.articleBySlug[action.payload.singleArticle.slug] = action.payload.singleArticle
      } else {
        state.articles = action.payload.articles
        state.articlesCount = action.payload.articlesCount
      }
    })
    // .addCase(fetchArticles.fulfilled, (state, action) => {
    //   state.articles = action.payload.articles
    //   state.articlesCount = action.payload.articlesCount
    // })
    // .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
    //   state.articleBySlug[action.payload.slug] = action.payload
    // })
  },
})

export const { setCurrentPage } = articlesSlice.actions

export const selectArticles = (state) => state.articles.articles
export const selectArticlesCount = (state) => state.articles.articlesCount
export const selectCurrentPage = (state) => state.articles.currentPage
export const selectPageSize = (state) => state.articles.pageSize
export const selectArticleBySlug = (slug) => (state) => state.articles.articleBySlug[slug]
// export const selectArticleBySlug = (state, slug) => state.articles.articleBySlug[slug]

export default articlesSlice.reducer
