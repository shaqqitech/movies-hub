import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Movies Hub',
  description: 'A Movie Site',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} scrollbar-hide`}>
        {children}
        </body>
    </html>
  )
}
