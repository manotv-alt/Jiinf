import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import { Home } from './pages/Home.jsx';
import { Teams } from './pages/Teams.jsx';
import { Calendar } from './pages/Calendar.jsx';
import { Modalitys } from './pages/Modalitys.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
         path: "/teams",
         element: <Teams/>
      },
      {
         path: "/calendar",
         element: <Calendar/>
      },
      {
         path: "/modalitys",
         element: <Modalitys/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
