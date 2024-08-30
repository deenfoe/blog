import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  user: null,
}

export const fetchSignUp = createAsyncThunk('authForm/fetchSignUp', async ({ username, email, password }) => {
  const response = await axios.post('https://blog.kata.academy/api/users', {
    user: {
      username,
      email,
      password,
    },
  })
  return response.data.user
})



const authFormSlice = createSlice({
  name: 'authForm',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})

export const selectState = (state) => state.authForm

export default authFormSlice.reducer
