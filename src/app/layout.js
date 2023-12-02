import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Movies Hub',
  description: 'A Movie Site',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} scrollbar-hide`}>
      <div className="absolute top-3 text-white z-10">
        <Navbar />
      </div>
        {children}
        </body>
    </html>
  )
}
