import { StrictMode ,lazy, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './utils/store.js'

const ProductList = lazy(()=>import('./components/ProductList.jsx'))
const ProductDetail = lazy(()=>import('./components/ProductDetail.jsx'))
const Cart = lazy(()=>import('./components/Cart.jsx'))
const Checkout = lazy(()=>import('./components/Checkout.jsx'))
const NotFound = lazy(()=>import('./components/NotFound.jsx'))
const App = lazy(()=>import('./App.jsx'))

const appRouter =  createBrowserRouter([
  {
    path:"/",
    element:<Suspense fallback={<div>Loading...</div>}>
      <App/>
    </Suspense>,
    children:[
      {
        path:"/",
        element:<ProductList/>
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
