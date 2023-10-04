import { configureStore } from '@reduxjs/toolkit'
import expenseReducer from './expense/expenseSlice'
import incomeReducer from './income/incomeSlice'

export const store = configureStore({
  reducer: {
    expense: expenseReducer,
    income: incomeReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch