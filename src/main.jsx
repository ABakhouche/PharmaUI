import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './HomePage.jsx'
import './index.css'
import './input.css';

import ReactDOM from 'react-dom/client' ;
import {createBrowserRouter , RouterProvider} from 'react-router-dom' ;
import Requests from "./Requests.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  } ,
  {
      path: '/Requests',
      element: <Requests />
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>

    </RouterProvider>

  </StrictMode>,
)
