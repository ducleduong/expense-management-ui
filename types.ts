export type ExpenseType = 'INCOME' | 'EXPENSE'

export type Expense = {
    id: string,
    title: string,
    type: ExpenseType,
    description: string,
    amount: number,
    date: Date,
    category: string,
    createdAt: Date,
    updateAt: Date,
}