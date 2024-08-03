import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './slices/filterSlice'
import ticketsReducer from './slices/ticketsSlice'

const store = configureStore({
  reducer: {
    filter: filterReducer,
    tickets: ticketsReducer,
  },
})

export default store
