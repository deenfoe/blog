import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axiosInstance from '../../api/axiosInstance'

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  errors: null,
}

export const fetchSignUp = createAsyncThunk(
  'authForm/fetchSignUp',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users', {
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
      const response = await axiosInstance.post('/users/login', {
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

export const fetchUserUpdate = createAsyncThunk('authForm/fetchUserUpdate', async (userData, { rejectWithValue }) => {
  try {
    // Используем axiosInstance, который автоматически добавляет токен через интерсептор
    const response = await axiosInstance.put('/user', {
      user: userData,
    })

    return response.data.user // Возвращаем данные пользователя при успешном запросе
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const authFormSlice = createSlice({
  name: 'authForm',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
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
      })
      .addCase(fetchSignIn.rejected, (state, action) => {
        state.errors = action.payload.errors
      })
      .addCase(fetchUserUpdate.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(fetchUserUpdate.rejected, (state, action) => {
        state.errors = action.payload.errors
      })
  },
})

export const { logout, clearErrors } = authFormSlice.actions

export const selectUser = (state) => state.authForm.user
export const selectUsername = (state) => state.authForm?.user?.username
export const selectErrors = (state) => state.authForm.errors
export const selectIsAuthenticated = (state) => !!state.authForm.user

export default authFormSlice.reducer
