import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ticketSorter: [
    {
      id: 1,
      label: 'САМЫЙ ДЕШЕВЫЙ',
      status: true,
    },
    {
      id: 2,
      label: 'САМЫЙ БЫСТРЫЙ',
      status: false,
    },
    {
      id: 3,
      label: 'ОПТИМАЛЬНЫЙ',
      status: false,
    },
  ],
}

const ticketSortSlice = createSlice({
  name: 'ticketSort',
  initialState,
  reducers: {
    setActiveButton: (state, action) => {
      // state.ticketSorter = state.ticketSorter.map((label) => ({
      //   ...label,
      //   status: label.label === action.payload, // ожидается status: true или false.
      //   // сравнивается label: 'ОПТИМАЛЬНЫЙ' с action.payload а это будет то, на какую кнопку нажал.
      // }))
      return {
        ...state,
        ticketSorter: state.ticketSorter.map((label) => ({
          ...label,
          status: label.label === action.payload,
        })),
      }
    },
  },
})

export const { setActiveButton } = ticketSortSlice.actions
export const selectButtons = (state) => state.ticketSort.ticketSorter

export default ticketSortSlice.reducer
