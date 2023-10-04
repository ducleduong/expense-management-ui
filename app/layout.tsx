import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useMemo } from 'react'
import Orb from '@/components/Orb/Orb'
import Navigation from '@/components/Navigation/Navigation'
import { Providers } from "@/redux/provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Expense Management',
  description: 'Expense Management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const memoOrb = useMemo(() => <Orb />, [])
  return (
    <html lang="en">
      <body className='bg-gradient-to-tr from-[#EFB9D0] via-[#EBD3F0] to-[#F0D3DC]'>
        <Providers>
          <div className='h-screen relative'>
            <div className='p-8 h-full flex gap-4'>
              <Navigation />
              <main className='flex-1 border border-border rounded-3xl overflow-x-hidden overflow-y-hidden'>
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
