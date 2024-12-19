import { Inter } from 'next/font/google'
import './globals.css'
import { ConfigProvider } from 'antd'
import { Providers } from '@/components/providers'
import Script from 'next/script'

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
      <head>
        <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      </head>
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
