import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { Home } from './pages/Home.jsx';
import { Teams } from './pages/Teams.jsx';
import { Calendar } from './pages/Calendar.jsx';
import { Modalities } from './pages/Modalities.jsx';

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
         path: "/modalities",
         element: <Modalities/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
