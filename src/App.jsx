import { Header, Footer } from './components/Layouts'
import OfflineScreen from './pages/Offline';
import Error404 from './pages/404';
import { Outlet } from 'react-router-dom'
import useApi from './hooks/useApi';
import bg from './assets/backgrounds/largeback.png';

function App() {

  const { isError, isOnline } = useApi();

    if (!isOnline) {
        return (
          <div className='min-h-screen flex flex-col bg-jiinf-background'>
            <OfflineScreen/>
          </div>
        );
    }
    else if (isError) {
      return (
        <div className='min-h-screen flex flex-col bg-jiinf-background'>
            <Error404/>
        </div>
      )
    }
    else {
      return (
        <div className='flex flex-col bg-jiinf-background'>
          <Header/>
            <main className='flex-grow bg-cover bg-center'>
              <Outlet/>
            </main>
          <Footer/>
        </div>
      )
    }
}

export default App
