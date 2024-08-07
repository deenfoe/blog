import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './slices/filterSlice'
import ticketsReducer from './slices/ticketsSlice'
import ticketSortReducer from './slices/ticketSortSlice'

const store = configureStore({
  reducer: {
    filter: filterReducer,
    tickets: ticketsReducer,
    ticketSort: ticketSortReducer,
  },
})

export default store
