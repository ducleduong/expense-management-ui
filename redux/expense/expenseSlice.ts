import { Expense } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ExpenseState = {
    expenses: Expense[];
};

const initialState: ExpenseState = {
    expenses: []
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setExpense: (state, action: PayloadAction<Expense[]>) => {
        state.expenses = action.payload
    }
  },
});

export const {setExpense} = expenseSlice.actions
export default expenseSlice.reducer;
