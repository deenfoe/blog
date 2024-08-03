import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allChecked: false,
  filters: {
    noStops: false,
    oneStop: false,
    twoStops: false,
    threeStops: false,
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleFilter: (state, action) => {
      state.filters[action.payload] = !state.filters[action.payload]
      // Проверка, все ли фильтры включены
      if (state.filters.noStops && state.filters.oneStop && state.filters.twoStops && state.filters.threeStops) {
        state.allChecked = true
      } else {
        state.allChecked = false
      }
    },
    toggleAll: (state) => {
      state.allChecked = !state.allChecked
      state.filters.noStops = state.allChecked
      state.filters.oneStop = state.allChecked
      state.filters.twoStops = state.allChecked
      state.filters.threeStops = state.allChecked
    },
    uncheckAllFilters: (state) => {
      state.allChecked = false
    },
  },
})

export const { toggleFilter, toggleAll, uncheckAllFilters } = filterSlice.actions
export const selectAllChecked = (state) => state.filter.allChecked
export const selectFilters = (state) => state.filter.filters

export default filterSlice.reducer
