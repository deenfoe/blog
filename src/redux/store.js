import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './slices/filterSlice'
import ticketsReducer from './slices/ticketsSlice'
import ticketSortReducer from './slices/ticketSortSlice'
import articlesReducer from './slices/articlesSlice'
import authFormReducer from './slices/authFormSlice'

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    authForm: authFormReducer,
    // filter: filterReducer,
    // tickets: ticketsReducer,
    // ticketSort: ticketSortReducer,
  },
})

export default store
