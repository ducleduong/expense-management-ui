import { Expense } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IncomeState = {
    incomes: Expense[];
};

const initialState: IncomeState = {
    incomes: []
};

export const incomeSlice = createSlice({
  name: "incomes",
  initialState,
  reducers: {
    setIncome: (state, action: PayloadAction<Expense[]>) => {
        state.incomes = action.payload
    }
  },
});

export const {setIncome} = incomeSlice.actions
export default incomeSlice.reducer;