import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProductListing from './components/ProductListing'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './CSS/style.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './components/Home'
import RootLayout from './components/RootLayout'
import DetailProduct from './components/DetailProduct'
import AddCardPage from './components/AddCardPage'
import WishLisht from './components/WishLisht'
import LoginRegister from './components/LoginRegister'
import DealsPage from './components/DealsPage'



createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/e-commerceweb">
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product-listing/:slug?/:sub_slug?" element={<ProductListing />} />
        <Route path='/details-product/:id' element={< DetailProduct />} />
        <Route path='/card-list' element={< AddCardPage />} />
        <Route path='/wish-list' element={< WishLisht />} />
        <Route path='/login-register' element={< LoginRegister />} />
        <Route path='/deals-page' element={< DealsPage />} />

      </Route>

      {/* Group Route function  */}
      <Route path='admin-panel'>

        <Route path='category'>
          <Route path='add' element={< AboutUs />} />
          <Route path='view' element={< AboutUs />} />
          <Route path='update' element={< AboutUs />} />
        </Route>

        <Route path='product'>
          <Route path='add' element={< AboutUs />} />
          <Route path='view' element={< AboutUs />} />
          <Route path='update' element={< AboutUs />} />
        </Route>

      </Route>
    </Routes>
  </BrowserRouter>
)
