import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NotFound from './components/NotFound.jsx'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductDetail from './components/ProductDetail.jsx'
import ProductList from './components/ProductList.jsx'


const appRouter =  createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<ProductList/>,
      },
      {
        path:"/product/:id",
        element:<ProductDetail/>,
      },
      {

      }
    ],
    errorElement:<NotFound/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
