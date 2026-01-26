import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartSidebar from '@/components/CartSidebar'
import ChatWidget from '@/components/ChatWidget'
import { CartProvider } from '@/context/CartContext'

export const metadata = {
  title: 'Glad Tidings',
  description: 'Glad Tidings application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col pt-14 sm:pt-16">
        <CartProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <CartSidebar />
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  )
}
