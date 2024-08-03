import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  searchId: null,
  tickets: [],
  loading: false,
  error: null,
  stop: false,
}

// создаем асинхронный thunk для получения searchId
export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async () => {
  const response = await axios.get('https://front-test.dev.aviasales.ru/search')
  return response.data.searchId
})

// Создаем асинхронный thunk для получения билетов
export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (searchId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://front-test.dev.aviasales.ru/tickets?searchId=${searchId}`)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
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

export const selectTickets = (state) => state.tickets.tickets
export const selectLoading = (state) => state.tickets.loading
export const selectError = (state) => state.tickets.error
export const selectStop = (state) => state.tickets.stop

export default ticketsSlice.reducer
