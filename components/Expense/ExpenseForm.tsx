import { Expense, ExpenseType } from "@/types"
import { Formik } from "formik"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../ui/button";
import { axiosInstance, categoryItems } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import Spinner from "../ui/spinner";

interface ExpenseFormValue {
  title: string,
  amount: number,
  date: Date,
  category: string,
  description: string,
}

type ExpenseFormProps = {
  type: ExpenseType
}

const ExpenseForm = ({ type }: ExpenseFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const initialValue: ExpenseFormValue = {
    title: '',
    amount: 0,
    date: new Date(),
    category: '',
    description: ''
  }

  const handleSubmit = async (values: ExpenseFormValue, actions: any) => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.post('/expense', {
        ...values,
        type,
      })
      if (response) {
        actions.resetForm()
        window.location.reload()
      }
    } catch (error: any) {
      toast({
        title: error
      })
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <Formik initialValues={initialValue} onSubmit={handleSubmit}>
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        <form className="flex flex-col gap-8 text-xl" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={values.title}
            disabled={isLoading}
            className="w-full outline-none border border-border py-2 px-4 bg-transparent shadow-lg text-primary-text/90 placeholder:text-primary-text/40 text-xl rounded-lg"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            onChange={handleChange}
            value={values.amount}
            disabled={isLoading}
            className="w-full outline-none border border-border py-2 px-4 bg-transparent shadow-lg text-primary-text/90 placeholder:text-primary-text/40 text-xl rounded-lg"
          />
          <DatePicker
            name="date"
            placeholderText='Enter A Date'
            selected={values.date}
            dateFormat="dd/MM/yyyy"
            disabled={isLoading}
            onChange={(date) => setFieldValue('date', date)}
            className="w-full outline-none border border-border py-2 px-4 bg-transparent shadow-lg text-primary-text/90 placeholder:text-primary-text/40 text-xl rounded-lg"
          />
          <div className="flex justify-end">
            <select required value={values.category} name="category" disabled={isLoading} onChange={handleChange} className="text-primary-text/40 focus:text-primary-text active:focus:text-primary-text text-xl rounded-lg bg-transparent border-white border w-full py-2 px-4 outline-none">
              <option value="" disabled >Select Option</option>
              {categoryItems[type].map((category: string) => (
                <option value={category} className="capitalize" key={category}>{category}</option>
              ))}
            </select>
          </div>
          <input
            name="description"
            placeholder='Add A Reference'
            disabled={isLoading}
            onChange={handleChange}
            value={values.description}
            className="w-full outline-none border border-border py-2 px-4 bg-transparent shadow-lg text-primary-text/90 placeholder:text-primary-text/40 text-xl rounded-lg"
            autoComplete="off"
          />
          <Button className="capitalize bg-[#F56692] text-xl" type="submit" disabled={isLoading}>{isLoading ? <Spinner /> : `Add ${type.toLowerCase()}`}</Button>
        </form>
      )}
    </Formik>
  )
}

export default ExpenseForm