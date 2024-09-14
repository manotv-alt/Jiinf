import Footer from './components/Footer'
import { Header } from './components/Header'
import { Outlet } from 'react-router-dom'
import { DataProvider } from './contexts/DataContext'

function App() {

  return (
    <div className='min-h-screen flex flex-col bg-black/50'>
      <Header/>

      <DataProvider>
        <main className='flex-grow mb-16'>
          <Outlet/>
        </main>
      </DataProvider>

      <Footer/>
    </div>
  )
}

export default App
