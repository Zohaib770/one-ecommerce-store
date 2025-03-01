import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main.tsx'
import Shop from './components/Shop.tsx'
import ProductDetails from './components/ProductDetails.tsx'
import Cart from './components/Cart.tsx'
import Checkout from './components/Checkout.tsx'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  )
}

export default App
