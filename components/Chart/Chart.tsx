"use client"
import { dateFormat } from "@/lib/utils"
import { Expense } from "@/types"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartData,
  ChartOptions,
} from 'chart.js'

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
)

type ChartProps = {
  incomes: Expense[],
  expenses: Expense[],
}

const Chart = ({ incomes, expenses }: ChartProps) => {
  const data: ChartData<"line", number[], string> = {
    labels: incomes.map((inc: Expense) => {
      const { date } = inc
      return dateFormat(date)
    }),
    datasets: [
      {
        label: 'Income',
        data: [
          ...incomes.map((income: Expense) => {
            const { amount } = income
            return amount
          })
        ],
        backgroundColor: '#04BF9D',
        tension: .2,
      },
      {
        label: 'Expenses',
        data: [
          ...expenses.map((expense: Expense) => {
            const { amount } = expense
            return amount
          })
        ],
        backgroundColor: '#5FCDD9',
        tension: .2,
      }
    ],
  }

  const chartOption: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }
  return (
    <div className="bg-main-background border border-border shadow-lg p-4 rounded-sm h-full">
      <Line data={data} options={chartOption} />
    </div>
  )
}

export default Chart