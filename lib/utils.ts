import { Expense } from "@/types";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const totalExpenses = (expenses: Expense[]) => {
  let total = 0;
  expenses.forEach((expense: Expense) => {
    total = total + expense.amount;
  });

  return total;
};

export const totalIncomes = (incomes: Expense[]) => {
  let total = 0;
  incomes.forEach((income: Expense) => {
    total = total + income.amount;
  });

  return total;
};

export const dateFormat = (date: Date) => {
  return moment(date).format("DD/MM/YYYY");
};

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const fetcher = async (url: string) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const currencyFormat = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    currency: "VND",
  }).format(amount);
};

export const categoryItems = {
  "EXPENSE": ["education", "groceries", "health", "subscriptions", "clothing", "travelling", "other"],
  "INCOME": ["salary", "freelancing", "investments", "bank", "other"]
}
