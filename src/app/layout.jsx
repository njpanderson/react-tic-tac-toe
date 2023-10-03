import './styles/global.css'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tic Tac Toe!',
  description: 'A quick Tic Tac Toe game.',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className='min-h-screen'>
      <body className={inter.className + ' min-h-screen'}>{children}</body>
    </html>
  )
}
