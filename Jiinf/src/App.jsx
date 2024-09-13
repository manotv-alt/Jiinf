import { useState } from 'react'
import { Header } from './components/Header'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className='min-h-screen bg-black/50'>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default App
