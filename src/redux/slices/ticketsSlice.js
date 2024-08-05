import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  searchId: null,
  tickets: [],
  loading: false,
  error: null,
  stop: false,
  displayedTicketsCount: 5,
}

// создаем асинхронный thunk для получения searchId
export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async () => {
  const response = await axios.get('https://aviasales-test-api.kata.academy/search')
  return response.data.searchId
})

// Создаем асинхронный thunk для получения билетов
export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (searchId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    showMoreTickets: (state) => {
      state.displayedTicketsCount += 5
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload
        state.loading = false
      })
      .addCase(fetchSearchId.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.tickets = [...state.tickets, ...action.payload.tickets]
        state.stop = action.payload.stop
        state.loading = false
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

export const { showMoreTickets } = ticketsSlice.actions

export const selectDisplayedTicketsCount = (state) => state.tickets.displayedTicketsCount
export const selectTickets = (state) => state.tickets.tickets
export const selectLoading = (state) => state.tickets.loading
export const selectError = (state) => state.tickets.error
export const selectStop = (state) => state.tickets.stop
export const selectSearchId = (state) => state.tickets.searchId

export default ticketsSlice.reducer
