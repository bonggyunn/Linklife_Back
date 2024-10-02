import './App.css'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import { useState } from 'react'

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(true)

  return (
    <div className='flex'>
      <Sidebar sidebarToggle={sidebarToggle}/>
      <Dashboard 
      sidebarToggle={sidebarToggle}
      setSidebarToggle={setSidebarToggle}/>
    </div>
  )
}

export default App
