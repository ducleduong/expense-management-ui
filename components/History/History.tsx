import { currencyFormat } from "@/lib/utils"
import { Expense } from "@/types"
import { useEffect, useState } from "react"

type HistoryProps = {
  incomes: Expense[],
  expenses: Expense[],
}

const History = ({ incomes, expenses }: HistoryProps) => {
  const [history, setHistory] = useState<Expense[]>([])

  useEffect(() => {
    const historyData =
      [...incomes, ...expenses]
        .sort((a: Expense, b: Expense) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3)

    setHistory(historyData)
  }, [incomes, expenses])

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">Recent History</h2>
      {history.map((item: Expense) => (
        <div className="bg-[#FCF6F9] border border-white shadow-lg p-4 rounded-lg flex justify-between items-center" key={item.id}>
          <p className={`text-${item.type === 'EXPENSE' ? 'rose-500' : 'green-500'}`}>{item.title}</p>
          <p className={`text-${item.type === 'EXPENSE' ? 'rose-500' : 'green-500'}`}>{`${item.type === 'EXPENSE' ? '-' : '+'}${currencyFormat(item.amount)}`}</p>
        </div>
      ))}
    </div>
  )
}

export default History