import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import './CssFrComponents/Shop.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-shell">
      <Header/>
      <main className="container">
        <Outlet/>
      </main>
    </div>
  )
}

export default App
