import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { truncateText, truncateTags } from '../../utils/textFormatter'

const initialState = {
  articles: [],
  articleBySlug: {},
  articleComments: {},
  articlesCount: 0,
  currentPage: 1,
  pageSize: 5,
  isSuccess: false,
  isLoading: false,
  errors: null,
}

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ slug, page, pageSize }, { getState }) => {
    const state = getState()
    const token = state.authForm?.user?.token
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {}

    // Проверяем, загружена ли статья по slug
    if (slug) {
      const existingArticle = state.articles.articleBySlug[slug]
      if (existingArticle) {
        // Если статья уже загружена, просто возвращаем её
        return { singleArticle: existingArticle }
      }

      // Если статья не загружена, делаем запрос
      const response = await axios.get(`https://blog.kata.academy/api/articles/${slug}`, config)
      return { singleArticle: response.data.article }
    }
    // Если slug нет, значит это запрос для списка статей
    const response = await axios.get(
      `https://blog.kata.academy/api/articles?limit=${pageSize}&offset=${(page - 1) * pageSize}`,
      config
    )

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
)

export const fetchCreateArticle = createAsyncThunk(
  'articles/fetchCreateArticle',
  async (userData, { getState, rejectWithValue }) => {
    try {
      const state = getState() // Получаем текущее состояние Redux
      const { token } = state.authForm.user // Извлекаем токен пользователя из
      const response = await axios.post(
        'https://blog.kata.academy/api/articles',
        {
          article: userData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data.article
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchUpdateArticle = createAsyncThunk(
  'articles/fetchUpdateArticle',
  async ({ slug, articleData }, { getState, rejectWithValue }) => {
    try {
      const state = getState()
      const { token } = state.authForm.user
      const response = await axios.put(
        `https://blog.kata.academy/api/articles/${slug}`,
        { article: articleData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data.article
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchDeleteArticle = createAsyncThunk(
  'articles/fetchDeleteArticle',
  async (slug, { getState, rejectWithValue }) => {
    try {
      const state = getState()
      const { token } = state.authForm.user
      await axios.delete(`https://blog.kata.academy/api/articles/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return slug
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message)
    }
  }
)

export const fetchFavoriteArticle = createAsyncThunk(
  'articles/fetchFavoriteArticle',
  async (slug, { getState, rejectWithValue }) => {
    try {
      const state = getState()
      const { token } = state.authForm.user
      const response = await axios.post(
        `https://blog.kata.academy/api/articles/${slug}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return response.data.article
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchUnFavoriteArticle = createAsyncThunk(
  'articles/fetchUnFavoriteArticle',
  async (slug, { getState, rejectWithValue }) => {
    try {
      const state = getState()
      const { token } = state.authForm.user
      const response = await axios.delete(
        `https://blog.kata.academy/api/articles/${slug}/favorite`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return response.data.article
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Добавляем новый asyncThunk для получения комментариев статьи
export const fetchArticleComments = createAsyncThunk(
  'articles/fetchArticleComments',
  async (slug, { getState, rejectWithValue }) => {
    try {
      const state = getState() // Получаем текущее состояние Redux
      const token = state.authForm?.user?.token // Извлекаем токен пользователя, если он есть

      // Конфигурируем заголовки, только если есть токен
      const config = token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {}
      const response = await axios.get(`https://blog.kata.academy/api/articles/${slug}/comments`, config)
      return { slug, comments: response.data.comments } // Возвращаем slug статьи и комментарии
    } catch (error) {
      return rejectWithValue(error.response.data || 'Failed to fetch comments') // Обрабатываем ошибки
    }
  }
)

export const fetchCreateComment = createAsyncThunk(
  'articles/fetchCreateComment',
  async ({ slug, commentBody }, { getState, rejectWithValue }) => {
    try {
      const state = getState()
      const token = state.authForm?.user?.token

      if (!token) {
        return rejectWithValue('User is not authenticated')
      }

      const response = await axios.post(
        `https://blog.kata.academy/api/articles/${slug}/comments`,
        {
          comment: {
            body: commentBody,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return { comment: response.data.comment, slug }
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message)
    }
  }
)

export const fetchDeleteComment = createAsyncThunk(
  'articles/fetchDeleteComment',
  async ({ commentId, slug }, { getState, rejectWithValue }) => {
    try {
      const state = getState()
      const token = state.authForm?.user?.token

      if (!token) {
        return rejectWithValue('User is not authenticated')
      }

      await axios.delete(`https://blog.kata.academy/api/articles/${slug}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return { commentId, slug }
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message)
    }
  }
)

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    resetSuccess(state) {
      state.isSuccess = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true
        state.errors = null
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload.singleArticle) {
          state.articleBySlug[action.payload.singleArticle.slug] = action.payload.singleArticle
        } else {
          state.articles = action.payload.articles
          state.articlesCount = action.payload.articlesCount
        }
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isSuccess = false
        state.isLoading = false
        state.errors = action.error.message || 'Failed to load articles'
      })
      .addCase(fetchCreateArticle.fulfilled, (state) => {
        state.isSuccess = true
      })
      .addCase(fetchUpdateArticle.fulfilled, (state, action) => {
        const updatedArticle = action.payload
        state.articleBySlug[updatedArticle.slug] = updatedArticle
        state.isSuccess = true
      })
      .addCase(fetchCreateArticle.rejected, (state) => {
        state.isSuccess = false
      })
      .addCase(fetchUpdateArticle.rejected, (state) => {
        state.isSuccess = false
      })
      .addCase(fetchDeleteArticle.fulfilled, (state, action) => {
        // Удаляем статью из списка articles и articleBySlug по slug
        state.articles = state.articles.filter((article) => article.slug !== action.payload)
        delete state.articleBySlug[action.payload]
        state.isSuccess = true
      })
      .addCase(fetchDeleteArticle.rejected, (state) => {
        state.isSuccess = false
      })

      .addCase(fetchFavoriteArticle.fulfilled, (state, action) => {
        const updatedArticle = action.payload
        state.articleBySlug[updatedArticle.slug] = updatedArticle
        const articleIndex = state.articles.findIndex((article) => article.slug === updatedArticle.slug)
        if (articleIndex !== -1) {
          state.articles[articleIndex] = updatedArticle
        }
      })
      .addCase(fetchUnFavoriteArticle.fulfilled, (state, action) => {
        const updatedArticle = action.payload
        state.articleBySlug[updatedArticle.slug] = updatedArticle
        const articleIndex = state.articles.findIndex((article) => article.slug === updatedArticle.slug)
        if (articleIndex !== -1) {
          state.articles[articleIndex] = updatedArticle
        }
      })
      .addCase(fetchArticleComments.pending, (state) => {
        state.isLoading = true // Отмечаем, что началась загрузка
        state.errors = null // Очищаем ошибки
      })
      .addCase(fetchArticleComments.fulfilled, (state, action) => {
        state.isLoading = false // Останавливаем индикатор загрузки
        const { slug, comments } = action.payload // Извлекаем slug и комментарии
        state.articleComments[slug] = comments // Сохраняем комментарии в state
      })
      .addCase(fetchArticleComments.rejected, (state, action) => {
        state.isLoading = false // Останавливаем индикатор загрузки
        state.errors = action.error.message || 'Failed to load comments' // Сохраняем сообщение об ошибке
      })
      .addCase(fetchCreateComment.fulfilled, (state, action) => {
        const { comment, slug } = action.payload
        state.articleComments[slug] = [...(state.articleComments[slug] || []), comment]
        state.isSuccess = true
      })
      .addCase(fetchCreateComment.rejected, (state, action) => {
        state.isSuccess = false
        state.errors = action.payload || 'Failed to create comment'
      })
      .addCase(fetchDeleteComment.fulfilled, (state, action) => {
        const { commentId, slug } = action.payload
        // Удаляем комментарий из стейта
        state.articleComments[slug] = state.articleComments[slug].filter((comment) => comment.id !== commentId)
        state.isSuccess = true
      })
      .addCase(fetchDeleteComment.rejected, (state, action) => {
        state.isSuccess = false
        state.errors = action.payload || 'Failed to delete comment'
      })
  },
})

export const { setCurrentPage, resetSuccess, resetFavorited } = articlesSlice.actions

export const selectArticles = (state) => state.articles.articles
export const selectArticlesCount = (state) => state.articles.articlesCount
export const selectCurrentPage = (state) => state.articles.currentPage
export const selectPageSize = (state) => state.articles.pageSize
export const selectIsSuccess = (state) => state.articles.isSuccess
export const selectIsLoading = (state) => state.articles.isLoading
export const selectErrors = (state) => state.articles.errors
export const selectArticleBySlug = (slug) => (state) => state.articles.articleBySlug[slug]
export const selectCommentsBySlug = (slug) => (state) => state.articles.articleComments[slug]

export default articlesSlice.reducer
