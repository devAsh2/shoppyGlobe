import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NotFound from './components/NotFound.jsx'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductDetail from './components/ProductDetail.jsx'
import ProductList from './components/ProductList.jsx'
import Cart from './components/Cart.jsx'
import Checkout from './components/Checkout.jsx'
import { Provider } from 'react-redux'
import { store } from './utils/store.js'


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
        path:"/cart",
        element:<Cart/>
      },
      {
        path:"/checkout",
        element:<Checkout/>
      }
    ],
    errorElement:<NotFound/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>,
)
