"use client"
import useSWR from 'swr'
import Chart from "../Chart/Chart"
import { currencyFormat, fetcher, totalExpenses, totalIncomes } from "@/lib/utils"
import { CircleDollarSign } from 'lucide-react'
import History from '../History/History'
import { Expense } from '@/types'
import Spinner from '../ui/spinner'

const Dashboard = () => {
  const { data: incomeData, error: incomeError, isLoading: incomeLoading } = useSWR('/expense?type=INCOME', fetcher)
  const { data: expenseData, error: expenseError, isLoading: expenseLoading } = useSWR('/expense?type=EXPENSE', fetcher)

  if (incomeError || expenseError) return <div>Error</div>

  if (incomeLoading || expenseLoading) return <Spinner />

  return (
    <div className="px-6 py-8 w-full">
      <h1 className='font-bold text-3xl'>All Transactions</h1>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-3 h-[400px]">
          <Chart incomes={incomeData} expenses={expenseData} />
          <div className='grid grid-cols-4 gap-8 mt-8'>
            <div className='col-span-2 bg-main-background border border-border shadow-lg rounded-lg p-2 flex flex-col justify-center items-center'>
              <h2 className='text-2xl'>Total Income</h2>
              <p className='flex text-3xl font-bold items-center text-income-text'><CircleDollarSign /> <span className='ml-1'>{currencyFormat(totalIncomes(incomeData))}</span></p>
            </div>
            <div className='col-span-2 bg-main-background border border-border shadow-lg rounded-lg p-2 flex flex-col justify-center items-center'>
              <h2 className='text-2xl'>Total Expense</h2>
              <p className='flex text-3xl font-bold items-center text-expense-text'><CircleDollarSign /> <span className='ml-1'>{currencyFormat(totalExpenses(expenseData))}</span></p>
            </div>
            <div className='flex flex-col justify-center items-center bg-main-background border border-border shadow-lg rounded-lg col-start-2 col-span-2 p-2'>
              <h2 className='text-2xl'>Total Balance</h2>
              <p className='flex text-3xl font-bold items-center text-green-500'><CircleDollarSign /> <span className='ml-1'>{currencyFormat(totalIncomes(incomeData) - totalExpenses(expenseData))}</span></p>
            </div>
          </div>
        </div>
        <div className='col-span-2'>
          <History incomes={incomeData} expenses={expenseData} />
          <h2 className='text-xl my-4 flex items-center justify-between'>Min <span className='text-2xl'>Salary</span>Max</h2>
          <div className="bg-main-background border border-border shadow-lg p-4 rounded-lg flex justify-between items-center text-income-text">
            <p className='font-semibold text-2xl'>
              ${currencyFormat(Math.min(...incomeData.map((item: Expense) => item.amount)))}
            </p>
            <p className='font-semibold text-2xl'>
              ${currencyFormat(Math.max(...incomeData.map((item: Expense) => item.amount)))}
            </p>
          </div>
          <h2 className='text-xl my-4 flex items-center justify-between'>Min <span className='text-2xl'>Expense</span>Max</h2>
          <div className="bg-main-background border border-border shadow-lg p-4 rounded-lg flex justify-between items-center text-expense-text">
            <p className='font-semibold text-2xl'>
              ${currencyFormat(Math.min(...expenseData.map((item: Expense) => item.amount)))}
            </p>
            <p className='font-semibold text-2xl'>
              ${currencyFormat(Math.max(...expenseData.map((item: Expense) => item.amount)))}
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard