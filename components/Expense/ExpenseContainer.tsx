"use client"
import { Expense, ExpenseType } from "@/types"
import ExpenseForm from "./ExpenseForm"
import ExpenseItem from "./ExpenseItem"
import useSWR from 'swr'
import { currencyFormat, fetcher, totalIncomes } from "@/lib/utils"
import Spinner from "../ui/spinner"
import { useEffect, useState } from "react"

const ExpenseContainer = ({type}: {type: ExpenseType}) => {
  const {data: expensesData, isLoading} = useSWR(`/expense?type=${type}`, fetcher)
  const [expenses, setExpenses] = useState<Expense[]>([])

  useEffect(() => {
    if(expensesData) setExpenses(expensesData)
  }, [expensesData])

  return (
    <div className="flex overflow-auto">
      <div className="py-8 px-6 w-full">
        <h1 className="text-3xl">Incomes</h1>
        <h2 className="text-2xl flex justify-center items-end bg-main-background border-border shadow-lg rounded-3xl p-4 my-6 gap-2 capitalize">
          Total {type.toLowerCase()}: <span className={type === 'EXPENSE' ? 'text-[#5FCDD9]' : 'text-[#04BF9D]'}>${expensesData && currencyFormat(totalIncomes(expenses))}</span>
        </h2>
        <div className="flex gap-8">
          <ExpenseForm type={type} />
          <div className="flex-1 overflow-scroll h-screen px-2">
            {isLoading ? <Spinner /> : expenses.map((income: Expense) => (<ExpenseItem key={income.id} expense={income} setExpenses={setExpenses}/>))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpenseContainer