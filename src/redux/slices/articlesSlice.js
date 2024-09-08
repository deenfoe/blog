import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axiosInstance from '../../api/axiosInstance'
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
  async ({ slug, page, pageSize }, { rejectWithValue }) => {
    try {
      if (slug) {
        const response = await axiosInstance.get(`/articles/${slug}`)
        return { singleArticle: response.data.article }
      }
      const response = await axiosInstance.get(`/articles?limit=${pageSize}&offset=${(page - 1) * pageSize}`)
      const truncatedArticles = response.data.articles.map((article) => ({
        ...article,
        title: truncateText(article.title, 50),
        description: truncateText(article.description, 150),
        tagList: truncateTags(article.tagList || []),
      }))
      return { articles: truncatedArticles, articlesCount: response.data.articlesCount }
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchCreateArticle = createAsyncThunk(
  'articles/fetchCreateArticle',
  async (articleData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/articles', {
        article: articleData,
      })
      return response.data.article
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchUpdateArticle = createAsyncThunk(
  'articles/fetchUpdateArticle',
  async ({ slug, articleData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/articles/${slug}`, {
        article: articleData,
      })
      return response.data.article
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchDeleteArticle = createAsyncThunk('articles/fetchDeleteArticle', async (slug, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/articles/${slug}`)
    return slug
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message)
  }
})

export const fetchFavoriteArticle = createAsyncThunk(
  'articles/fetchFavoriteArticle',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/articles/${slug}/favorite`)
      return response.data.article
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message)
    }
  }
)

export const fetchUnFavoriteArticle = createAsyncThunk(
  'articles/fetchUnFavoriteArticle',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/articles/${slug}/favorite`)
      return response.data.article
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message)
    }
  }
)

export const fetchArticleComments = createAsyncThunk(
  'articles/fetchArticleComments',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/articles/${slug}/comments`)
      return { slug, comments: response.data.comments }
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Failed to fetch comments')
    }
  }
)

export const fetchCreateComment = createAsyncThunk(
  'articles/fetchCreateComment',
  async ({ slug, commentBody }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/articles/${slug}/comments`, {
        comment: { body: commentBody },
      })
      return { comment: response.data.comment, slug }
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message)
    }
  }
)

export const fetchDeleteComment = createAsyncThunk(
  'articles/fetchDeleteComment',
  async ({ commentId, slug }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/articles/${slug}/comments/${commentId}`)
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
        state.isLoading = true
        state.errors = null
      })
      .addCase(fetchArticleComments.fulfilled, (state, action) => {
        state.isLoading = false
        const { slug, comments } = action.payload
        state.articleComments[slug] = comments
      })
      .addCase(fetchArticleComments.rejected, (state, action) => {
        state.isLoading = false
        state.errors = action.error.message || 'Failed to load comments'
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
