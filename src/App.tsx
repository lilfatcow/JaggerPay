import { Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'

function App() {
  return (
    <ConfigProvider>
      <Routes>
        <Route path="/" element={<div>Welcome to JaggerPay</div>} />
      </Routes>
    </ConfigProvider>
  )
}

export default App
