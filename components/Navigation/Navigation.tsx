"use client"
import { cn } from "@/lib/utils";
import { CreditCard, LineChart, Receipt, TrendingUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname()
  return (
    <div className="px-8 py-6 w-96 h-full border border-border rounded-3xl flex flex-col justify-between gap-8 shadow-lg">
      <div className="h-28 flex items-center gap-4">
        <div className="w-full text-center">
          <h1 className="font-semibold text-2xl">Your Money</h1>
        </div>
      </div>
      <ul className="flex-1 flex flex-col text-xl">
        <li>
          <Link href={'/'} className={
            cn(
              "flex items-center my-2 font-medium cursor-pointer pl-4 text-primary-text/60 relative transition-all duration-75 ease-in-out",
              pathname === '/'
                ? "text-primary-text before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-primary-text before:rounded-full"
                : ""
            )}><LineChart /> <span className="mx-1">Dashboard</span></Link>
        </li>
        <li>
          <Link href={'/incomes'} className={
            cn(
              "flex items-center my-2 font-medium cursor-pointer pl-4 text-primary-text/60 relative transition-all duration-75 ease-in-out",
              pathname.includes("/incomes")
                ? "text-primary-text before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-primary-text before:rounded-full"
                : ""
            )}><TrendingUp /> <span className="mx-1">Incomes</span></Link>
        </li>
        <li>
          <Link href={'/expenses'} className={
            cn(
              "flex items-center my-2 font-medium cursor-pointer pl-4 text-primary-text/60 relative transition-all duration-75 ease-in-out",
              pathname.includes("/expenses")
                ? "text-primary-text before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-primary-text before:rounded-full"
                : ""
            )}><Receipt /> <span className="mx-1">Expenses</span></Link>
        </li>
      </ul>
    </div>
  )
}

export default Navigation