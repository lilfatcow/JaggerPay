import { Inter } from 'next/font/google'
import './globals.css'
import { ConfigProvider } from 'antd'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WonderPay',
  description: 'Private bill-pay and payments automation platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ConfigProvider>
            {children}
          </ConfigProvider>
        </Providers>
      </body>
    </html>
  )
}
