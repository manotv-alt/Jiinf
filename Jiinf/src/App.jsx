import { Header, Footer } from './components/Layouts'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className='min-h-screen flex flex-col bg-jiinf-background'>
      <Header/>
        <main className='flex-grow mb-20'>
          <Outlet/>
        </main>
      <Footer/>
    </div>
  )
}

export default App
