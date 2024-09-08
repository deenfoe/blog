import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import axiosInstance from '../../api/axiosInstance'

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  errors: null,
}

export const fetchSignUp = createAsyncThunk(
  'authForm/fetchSignUp',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://blog.kata.academy/api/users', {
        user: {
          username,
          email,
          password,
        },
      })
      return response.data.user
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchSignIn = createAsyncThunk(
  'authForm/fetchSignIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://blog.kata.academy/api/users/login', {
        user: {
          email,
          password,
        },
      })
      return response.data.user
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchUserUpdate = createAsyncThunk(
  'authForm/fetchUserUpdate',
  async (userData, { getState, rejectWithValue }) => {
    try {
      const state = getState() // Получаем текущее состояние Redux
      const { token } = state.authForm.user // Извлекаем токен пользователя из состояния Redux

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

      return response.data.user // Возвращаем данные пользователя при успешном запросе
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const authFormSlice = createSlice({
  name: 'authForm',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      // localStorage.removeItem('user')
    },
    clearErrors: (state) => {
      state.errors = null
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        state.errors = action.payload.errors
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        state.user = action.payload
        // localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(fetchSignIn.rejected, (state, action) => {
        state.errors = action.payload.errors
      })
      .addCase(fetchUserUpdate.fulfilled, (state, action) => {
        state.user = action.payload
        // localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(fetchUserUpdate.rejected, (state, action) => {
        state.errors = action.payload.errors
      })
  },
})

export const { logout, clearErrors } = authFormSlice.actions

// export const selectState = (state) => state.authForm
export const selectUser = (state) => state.authForm.user
export const selectUsername = (state) => state.authForm?.user?.username
export const selectErrors = (state) => state.authForm.errors
export const selectIsAuthenticated = (state) => !!state.authForm.user

export default authFormSlice.reducer
