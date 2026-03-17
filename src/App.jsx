import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Shopify app</h1>
      <Header/>
      <Outlet/>
    </>
  )
}

export default App
