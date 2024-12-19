import { Button, Typography } from 'antd'
import Link from 'next/link'

const { Title } = Typography

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <Title level={1}>Welcome to WonderPay</Title>
      <p className="mb-8">
        Streamline your payments and financial workflows
      </p>
      <div className="space-x-4">
        <Link href="/login">
          <Button type="primary" size="large">
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button size="large">
            Register
          </Button>
        </Link>
      </div>
    </main>
  )
}
