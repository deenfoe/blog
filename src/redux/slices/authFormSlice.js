import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
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

export const fetchSignIn = createAsyncThunk('authForm/fetchSignIn', async ({ email, password }) => {
  const response = await axios.post('https://blog.kata.academy/api/users/login', {
    user: {
      email,
      password,
    },
  })
  return response.data.user
})

export const fetchUserUpdate = createAsyncThunk('authForm/fetchUserUpdate', async (userData, { getState }) => {
  const state = getState() // Получаем текущее состояние Redux
  const token = state.authForm.user.token // Извлекаем токен пользователя из состояния Redux
  const response = await axios.put(
    'https://blog.kata.academy/api/user',
    {
      user: userData,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data.user
})

const authFormSlice = createSlice({
  name: 'authForm',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      localStorage.removeItem('user')
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(fetchUserUpdate.fulfilled, (state, action) => {
        state.user = action.payload
      })
  },
})

export const { logout } = authFormSlice.actions

export const selectState = (state) => state.authForm
export const selectUser = (state) => state.authForm.user

export default authFormSlice.reducer
