import { configureStore } from '@reduxjs/toolkit'

import articlesReducer from './slices/articlesSlice'
import authFormReducer from './slices/authFormSlice'

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    authForm: authFormReducer,
  },
})

export default store
