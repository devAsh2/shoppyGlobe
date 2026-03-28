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
    element:<App/>,
    children:[
      {
        path:"/",
        element:(
          <Suspense fallback={<div>Loading...</div>}>
            <ProductList/>
          </Suspense>
        )
      },
      {
        path:"/product/:id",
        element:(
          <Suspense fallback={<div>Loading...</div>}>
            <ProductDetail/>
          </Suspense>
        ),
      },
      {
        path:"/cart",
        element:(
          <Suspense fallback={<div>Loading...</div>}>
            <Cart/>
          </Suspense>
        )
      },
      {
        path:"/checkout",
        element:(
          <Suspense fallback={<div>Loading...</div>}>
            <Checkout/>
          </Suspense>
        )
      }
    ],
    errorElement:(
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound/>
      </Suspense>
    )
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>,
)
