import { axiosInstance, currencyFormat, dateFormat } from '@/lib/utils'
import { Expense } from '@/types'
import { Calendar, DollarSign, MessageCircle, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useToast } from '../ui/use-toast'
import Spinner from '../ui/spinner'

const ExpenseItem = ({expense, setExpenses}: {expense: Expense, setExpenses: any}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const {toast} = useToast() 

  const handleDeleteExpense = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.delete(`/expense/${expense.id}`)
      if(response) setExpenses((prev: Expense[]) => prev.filter(expenseData => expenseData.id !== expense.id))
    } catch (error: any) {
      toast({
        title: error.message
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='bg-main-background border-border shadow-lg flex rounded-3xl p-4 items-center gap-4 text-primary-text w-full my-4'>
      <div className='flex-1 flex flex-col gap-1'>
        <h5 className={`text-xl mb-1 pl-8 relative before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%] before:w-3 before:h-3 before:rounded-full ${expense.type === 'EXPENSE' ? 'before:bg-[#5FCDD9]' : 'before:bg-[#04BF9D]'}`}>{expense.title}</h5>
        <div className='flex items-center gap-6'>
          <p className='flex items-center gap-2 text-primary-text/80'><DollarSign /><span>{currencyFormat(expense.amount)}</span></p>
          <p className='flex items-center gap-2 text-primary-text/80'><Calendar /><span>{dateFormat(expense.date)}</span></p>
          <p className='flex items-center gap-2 text-primary-text/80'><MessageCircle />{expense.description}</p>
        </div>
      </div>
      <Button className='text-white bg-rose-500 rounded-full inline-block' onClick={handleDeleteExpense}>{loading ? <Spinner /> : <Trash />}</Button>
    </div>
  )
}

export default ExpenseItem